# The Nature of Data: Why Lesan's embedding isn't a write-nightmare

**TL;DR** — After [part 1](https://miaadteam.github.io/lesan/docs/advantages/why-lesan) (Lesan turns a ~2,550,250-doc read into ~25,250), the obvious objection is "but every embedded copy must be kept in sync on writes." The answer comes from the **nature of data**: the writes that are expensive to maintain are exactly the ones that happen least often. Reads dominate by orders of magnitude. We built [Lesan](https://github.com/MiaadTeam/lesan) around that reality. AGPL-3.0, open source.

## The law

- A blog article is **read** a million times, **written** once.
- A user updates their profile **1–2×/year**; their content is **read 100K×/day**.

> Expensive writes are rare. Cheap operations are frequent.

## The best case: a blog

`article` embeds its **author** (pure snapshot); `user` embeds its **50 latest articles** — both synced automatically by Lesan.

**Reads** (the whole business): latest, best, most-visited, related, "more by this author" strip — every path needs the author, and the author is already embedded. No joins, no second queries.

**Writes**: updating an article touches **2 places** (the article + the author's array). Against **a million reads**. Even the scary case — a user who posts daily for a year (max **365 articles**) gets updated/deleted → **365 writes once a year vs millions of reads/day**. That's a steal, not a compromise.

## The worst case: population stats

`country` + `human`, embedded both ways — and `country.population` changes **every 5 seconds**. Naively that ripples to **>1B embedded copies** (India/China). The moment embedding looks insane.

**Fix 1:** `excludes: ["population"]` on the relation — volatile field never copied into humans. Done.

**Fix 2 (the interesting one):** the "population field" is really a *history* — promote it to its own **model**. Country embeds its **last 50 population records**; each record embeds its country. Now:

- **no** country update, **no** billion-doc sync — worst case is 2 ops (insert + embed),
- you get **population history, trends, and analytics** for free,
- and it's literally a documented Lesan principle: *"every frequently-changing field can become a relationship."*

Lesan didn't just fix the problem — it **guided you to a better model**. It encourages you to have children. 🧒

## The rule

1. Deep read-heavy graphs → embed, get O(log n) reads; writes are rare anyway.
2. Volatile fields → `exclude`, or promote to a model.
3. Wherever writes are expensive, they're rare. Design for the reads.

Full write-up with code: [article-2.md](https://github.com/MiaadTeam/lesan/tree/main/examples/whyLesan) · Docs: https://miaadteam.github.io/lesan/docs/advantages/relationship-economics

Roast away — especially the "2 ops vs 1B syncs" math, I'd love to defend it. 😄