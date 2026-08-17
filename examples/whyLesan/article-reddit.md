# Why Lesan: O(n²) queries → O(log n), without the embed-sync nightmare

**TL;DR** — We built [Lesan](https://github.com/MiaadTeam/lesan), a cross-platform (Node/Bun/Deno) TS web framework + ODM for MongoDB. Its core trick: **relationships are defined one-directional but embedded bi-directionally in storage, and Lesan keeps the embedded copies in sync for you**. Reads that take ~2.5M documents in a classic nested-query stack take ~25K with Lesan. Open source, AGPL-3.0.

## The setup

One screen asks for: 250 countries → for each, 50 recent + 50 oldest users, 50 populous provinces (+ their users), 50 populous cities (+ their users).

**Classic stack:** ~2,550,250 documents fetched, most of it as nested queries (or `$lookup`s doing the same work). In an ORM, that's 2.5M *round-trips* between server and DB. Latency lives in those round-trips.

**Lesan:** you define the relation once with `relatedRelations`, e.g. a province→country relation declares the country gains `provinces` (50 newest) *and* `provincesByPopulation` (50 most populous) — two pre-sorted, limited, embedded arrays.

```ts
const provinceRelations = {
  country: {
    schemaName: "country",
    type: "single",
    relatedRelations: {
      provinces: { type: "multiple", limit: 50, sort: { field: "_id", order: "desc" } },
      provincesByPopulation: { type: "multiple", limit: 50, sort: { field: "population", order: "desc" } },
    },
  },
};
```

Insert a province with a `countryId` → Lesan embeds it into **both** sorted arrays, keeps the forward snapshot in sync, and evicts past `limit: 50`. Update/delete → same, automatically. You write **zero** sync code.

## The part nobody likes to talk about: manual embedding is a nightmare

If you embed by hand, you own the sync. One user update across two collections looks like four `updateMany` + `arrayFilters` calls (and that's the *minimal* version — multiply by cities, the by-population ordering, and deletes, and you get stale-data bugs).

Lesan deletes this entire class of code — that's the real point of the framework, not just the query-count math.

## Honest numbers

From our [reproducible benchmark repo](https://github.com/MiaadTeam/benchmark), same request vs:

- `prisma-express-rest` (Postgres): **1,168%** faster to first byte
- `prisma-express-graphql` (Postgres): **1,417%** faster
- `mongoose-express-rest` (unsorted): **4,435%** faster
- `mongo-express-rest` (unsorted): **72,289%** faster
- `mongoose-express-rest` (sorted): **298,971%** faster

Big %s are mostly because the baselines are doing *catastrophically* more work — which is the point. Lesan's own HTTP server also does **10k+ req/s on Bun/Deno** (it's just native HTTP + the official MongoDB driver).

## Tradeoffs (so you can roast us fairly)

- **Writes cost more** — every relation touch also updates embedded copies. Lesan mitigates with `limit`, `excludes`, and pure projections, but write-heavy/shallow-read apps won't see the dramatic win.
- **Duplication is real** — embedded copies are trimmed pure projections, not full docs, but they're still duplicates.
- **16 MB doc ceiling** — bounded by `limit` on every back-reference; don't embed 100K-child lists.
- **High-cardinality reverse lists** → query the child collection with an index instead.

## Try it

```bash
deno run -A examples/whyLesan/performance.ts   # needs local MongoDB
```

Full write-up (with code + screenshots): [article.md](https://github.com/MiaadTeam/lesan/tree/main/examples/whyLesan/article.md) · Docs: https://miaadteam.github.io/lesan/

Happy to defend the numbers in the comments — especially the "298,971%" one, I promise it's a real measurement. 😄