# The Nature of Data: Why Lesan's Relationships Win in the Real World

*In the last article we showed the mechanism — Lesan turns a ~2,550,250-document read into a ~25,250-document read by embedding relationships and keeping them in sync. This article answers the obvious objection: "But what about the writes?" The answer comes from the nature of data itself.*

**By the Lesan team** · [GitHub](https://github.com/MiaadTeam/lesan) · [Docs](https://miaadteam.github.io/lesan/) · [Read part 1](https://miaadteam.github.io/lesan/docs/advantages/why-lesan)

---

## 1. The objection

Any engineer who reads [Why Lesan](https://miaadteam.github.io/lesan/docs/advantages/why-lesan) — where embedded relationships turn a ~2.5-million-document request into a ~25-thousand-document one — asks the same question within seconds:

> *"OK, but you're duplicating data. Every time something changes, you have to update all those embedded copies. Isn't that a nightmare on writes?"*

It's a fair question. Manual embedding *is* a nightmare on writes — we showed the `updateMany` + `arrayFilters` horror in part 1. The difference is that Lesan automates the sync. But the deeper objection remains: even automated, doesn't maintaining N embedded copies make every write N times more expensive?

The honest answer is: **sometimes yes — and it doesn't matter.** Because of the nature of data models, the writes that cost you the most are exactly the ones that happen least often.

Let's look at real projects to see why.

## 2. The law of data

Step back from frameworks for a moment and look at what data actually does in the wild:

- A blog article is **read** thousands of times a day, but **written** once.
- A social post is **viewed** millions of times, but **created** once.
- A user updates their profile **once or twice a year**, but their content is **read hundreds of thousands of times a day**.
- A product's description changes **a few times a year**, but it's **browsed** thousands of times a day.

[[ IMAGE 1: Comparison chart of the read-write asymmetry (giant "reads per day" bar vs tiny "writes per day" bars; blog article, social post, user profile; dark bg, cyan accent) — insert "assets/article2/00-A comparison chart showing the read-write asymmetry.jpg" ]]

There's a pattern here, and it's not a coincidence:

> **Expensive updates and deletions are rare. Cheap operations are frequent.**

This is the *nature of data models*. Reading is what users do all day; writing is what happens occasionally. And critically — the operations that are *expensive to maintain* in an embedded world (updating a user who is embedded in a thousand articles) are precisely the operations that *happen least often* (a user updates their profile twice a year).

Every framework optimizes reads. Few stop to notice that the write side — the side they're terrified of — is rare *because* it's expensive, and cheap *because* it's frequent. Lesan was designed around this reality, and that's what makes it elegant rather than hacky.

## 3. The best case: a blog

Let's build a blog. The classic models: `user`, `category`, `tag`, and `article`. We'll focus on just `user` and `article` — the heart of any blog.

With Lesan we declare the relationship once, on the side that needs it, and embedding happens on both sides automatically:

```typescript
const articleRelations = {
  author: {
    schemaName: "user",
    type: "single",
    relatedRelations: {
      articles: {
        type: "multiple",
        limit: 50,
        sort: { field: "_id", order: "desc" },
      },
    },
  },
};
```

The effect: an **article** embeds its **author** (a pure snapshot of the user: `_id`, name, avatar, bio), and a **user** embeds their **50 most recent articles**. Both sides stay in sync on every insert, update, and delete — automatically, with zero extra code.

[[ IMAGE 2: Entity-relationship diagram — "user" and "article" boxes, two arrows: article → author (single snapshot) and user → articles (array of 50, newest-first); annotation "embedded both ways, synced by Lesan" — insert "assets/article2/01-A simple entity-relationship diagram — _user_ and _article_ boxes with two arrows- article → author.jpg" ]]

### 3.1 Reads: this is where a blog lives

A blog is a read machine. Look at all the ways an article is fetched:

- the **latest articles** (home feed),
- the **best articles** (by score or votes),
- the **most visited articles**,
- **related articles** (same category),
- the article page itself,
- the **"more by this author"** strip at the bottom of an article (6–7 more articles by the same author).

And almost every one of these needs the **author** next to the article — the byline, the avatar, the author page link.

In a classic stack, each of those read paths needs a *join* or a *second query* for the author. With Lesan, the author's `_id` and pure info are already embedded inside the article document. Every one of those read paths is served by the same snapshot:

- author's `_id` → **instant** lookup of the author's full profile when needed,
- author's pure info → **already there**, no query at all,
- the "more by this author" strip → served by the **user's embedded `articles` array** (50 newest), fetched in the same request as the article.

The read cost collapses to a handful of documents — the same O(log n) win from [part 1](https://miaadteam.github.io/lesan/docs/advantages/why-lesan), applied to every single read path of a real blog.

### 3.2 Writes: the cost is tiny because it's rare

Now the part that scared us: when an article is **updated** or **deleted**, how many places does it live?

1. the article document itself, and
2. the author's embedded `articles` array — and even that is bounded: the array holds only the **50 newest** articles, so Lesan touches it only when the changed article is actually inside that window. An article that has already fallen past the limit lives only in the `article` collection — there is nothing to sync.

That's **two places**. And how often does an article change? Once when it's written, and maybe once more when it's edited. Meanwhile it's read **a million times**.

> **A million reads against two writes.**

The balance is absurdly good. The sync Lesan does on those two rare writes is nothing compared to the reads it saves on every single view.

### 3.3 The harder write: the user updates or deletes themselves

The genuinely expensive scenario is the **user** changing. Now every article embedding them must be refreshed. And that number could be large — a popular author with thousands of articles.

But how large, really? Think about the *nature* of a user:

- A user who publishes **every single day for a year** has at most **365 articles**.
- Updating or deleting that user means touching up to **365 embedded snapshots** — a bounded, knowable, one-time cost.
- Meanwhile, those same 365 articles are read **hundreds of thousands of times a day**.

> **Millions of reads every day, against 365 writes once a year.**

That's not a compromise. That's a *steal*. The worst case for a blog is bounded by how many articles one person can realistically write — and that number is nothing compared to how often those articles are read.

### 3.4 Why the blog is the "best case"

The blog is the best case because it's the *typical* case. Content platforms, news sites, documentation, forums, catalogs — they all have this shape:

- a small set of **content entities** (articles, products, posts) written rarely,
- each embedded in its parent (author, category, store) in a few bounded places,
- read **constantly** in many different orderings (latest, best, most-visited, related).

Wherever the write cost is real, the write frequency is minuscule. Lesan's embedding spends a little on the rare writes to save a lot on the constant reads.

## 4. The worst case: population statistics

Now let's be honest — because if this article only showed the easy case, you'd be right to distrust it. There *is* a scenario where embedding seems catastrophic. And studying it is exactly what teaches us the most.

Imagine an app that stores population statistics: a `country` model and a `human` model.

- The country is embedded inside each human (so a human always knows their country).
- The last ~50 humans are embedded inside each country (for first-page pagination; the rest come from the `human` model on later pages, and the country is embedded in each human so the query stays optimal).

Same pattern as the blog. Then disaster strikes: the country has a **`population` field**, and it changes **every 5 seconds**. To keep the world consistent, every human of that country must have their embedded country snapshot refreshed. India. China. **More than a billion updates every 5 seconds.**

[[ IMAGE 3: Diagram — a "country" node with "population field changes every 5s" and a fan of arrows to "human 1", "human 2", "…", "human 1,000,000,000+"; dark theme, red warning accent; caption "The nightmare — every embedded copy must be refreshed" — insert "assets/article2/02-A diagram showing a "country" node with "population field changes every 5s".jpg" ]]

This is the moment embedding looks like the worst idea in engineering history. And it's a *real* concern — it's why many teams are terrified of denormalization.

### 4.1 Solution 1: exclude the volatile field

The first fix is trivial. Tell Lesan not to embed `population` into humans:

```typescript
const humanRelations = {
  country: {
    schemaName: "country",
    type: "single",
    excludes: ["population"],   // don't copy this field into humans
    relatedRelations: {
      // humans embedded in country, last 50, as before
    },
  },
};
```

Now updating `population` touches only the country document. The humans still know their country (name, flag, `_id`), just not its live population. **Problem solved.** Hooray.

But let's not stop there — because there's a more interesting solution, and it's the one that reveals the heart of Lesan.

### 4.2 Solution 2: let the nature of data guide you — have children

Go back to the *essence* of the model. What is `population`, really?

It isn't a stable property like a country's `name` or `abb`. It's a **history** — a series of values changing over time. A field that changes every 5 seconds isn't a field; it's an entity that *wants* to be born.

So instead of a field, make it a **model**:

```typescript
const populationRelations = {
  country: {
    schemaName: "country",
    type: "single",
    relatedRelations: {
      populations: {
        type: "multiple",
        limit: 50,
        sort: { field: "recordedAt", order: "desc" },
      },
    },
  },
};
```

Now:

- a country embeds its **last 50 population records**, and
- each population record embeds its **country**.

Both sides are stored together, synced automatically, and — crucially — the whole thing becomes *analytically rich*:

- every population record carries its own **timestamp**,
- you can chart a country's population **history**, not just its current number,
- you can compute **deltas, trends, and statistics** from real data,
- and the human model's embedded country snapshot can simply `exclude` the volatile data entirely.

[[ IMAGE 4: Diagram — "country" at top with arrow to a "population" model box ("last 50 population records embedded"), population records pointing back to country; annotation "population promoted from a field to a model. Lesan encourages you to have children" — insert "assets/article2/03- A diagram showing "country" at the top with an arrow to a "population" model box.jpg" ]]

Did you notice what happened? **The Lesan mechanism itself guided you to a better, more professional model.** Instead of "country + a billion fragile embedded copies," you now have "country + a tidy `population` model + humans" — each with clean, bounded relationships.

This isn't a coincidence of this example. It's a documented principle in the [Lesan docs on relationships](https://miaadteam.github.io/lesan/docs/concepts/what-is-the-relationship):

> **"Every frequently-changing field can become a relationship."**

A field that changes often is a sign that a new model wants to be born. Lesan doesn't just tolerate that — it *encourages* it, because its relationship engine makes the birth cheap and safe. The concept page put it beautifully: *"If the relationship leads to the birth of a child, both parties accept the relationship."*

### 4.3 The economics of the fix

After the promotion, what does a write cost?

- Insert a new population record: **one insert** into the `population` collection — plus the automatic embed into the country's last-50 array.
- No update to the country. No update to a billion humans.

In the absolute worst case — compared to the naive design — you do **two operations instead of one** (the insert plus the embed). Against **millions of reads** for statistics and analytics, that is nothing.

And here's the beautiful part: you didn't just *fix* the problem. You *upgraded the model*. The naive "update a population field" design could only ever answer "what's the population right now?" The model-design fix can answer "how has the population *changed* over the last month?" — because the history now *exists* as data.

## 5. The general rule

Put the two archetypes together and you get a practical design law you can apply to any project:

1. **Deep, read-heavy graphs** (blog, catalog, map, feed, org chart) — embed the relations and enjoy O(log n) reads. The rare writes are cheap to maintain; the constant reads are where your users actually live.
2. **Volatile fields** (population, price, stock, status) — don't embed them into a billion documents. Either **`exclude`** them from the snapshot, or **promote them into their own model** and let Lesan maintain the relationship.
3. **Wherever writes are expensive, they are rare.** Design for the reads.

The nature of data models is on your side. All you have to do is notice it.

## 6. The takeaway

In [part 1](https://miaadteam.github.io/lesan/docs/advantages/why-lesan) we showed that Lesan turns a ~2,550,250-document read into a ~25,250-document read. The obvious objection was *"but what about the writes?"*

This article is the answer:

- In a blog, writing an article means syncing **two places**, against **a million reads**.
- Even the worst case — updating a user who published every day for a year — is **365 writes once a year**, against **millions of reads every day**.
- And the truly volatile fields (population changing every 5 seconds) aren't embedding problems at all — they're a sign that **a new model should be born**, and Lesan makes that birth elegant and safe.

Lesan isn't fast because it's clever. **It's fast because it understood the nature of data first.**

If you've read this far, try it: look at your own database, find your most-read entity, and ask "how many places does it live, and how often does each copy change?" You'll find the same asymmetry. That's the nature of data — and it's why Lesan feels like it was designed for the real world.

---

**Resources**

- Part 1 — [Why Lesan: turning O(n²) into O(log n)](https://miaadteam.github.io/lesan/docs/advantages/why-lesan)
- The philosophy — [What Is the Relationship Really?](https://miaadteam.github.io/lesan/docs/concepts/what-is-the-relationship)
- Why MongoDB — [Why NoSQL?](https://miaadteam.github.io/lesan/docs/concepts/why-nosql)
- Lesan on GitHub: [github.com/MiaadTeam/lesan](https://github.com/MiaadTeam/lesan)
- Docs: [miaadteam.github.io/lesan](https://miaadteam.github.io/lesan/)
- License: AGPL-3.0