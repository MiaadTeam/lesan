# Why Lesan

This folder supports the **"Why Lesan"** article series — the in-depth companion material for
[Lesan](https://github.com/MiaadTeam/lesan), a cross-platform (Node.js / Bun / Deno)
TypeScript web framework + ODM for MongoDB.

## What's here

| File | Purpose |
|------|---------|
| `performance.ts` | The runnable country / province / city / user example used in **article 1**. It defines the 4 models, their embedded `relatedRelations` (dual sorted arrays), and the `addCountry` / `addProvince` / `addCity` / `getCountries` acts. |
| `article.md` | **Article 1 — "Why Lesan."** The full long-form English article (Medium-ready, ~3,000+ words): embedding turns O(n²) into O(log n). |
| `article-reddit.md` | Article 1 short Reddit variant with a TL;DR. |
| `article-2.md` | **Article 2 — "The Nature of Data."** Long-form English article (Medium-ready): the real-world economics — expensive writes are rare, cheap writes are frequent (blog best-case, population worst-case). |
| `article-2-reddit.md` | Article 2 short Reddit variant. |
| `article-medium.md` | **Medium-ready copy of article 1** — tables converted to bullet lists, images replaced with `[[ IMAGE n: ... ]]` markers. Paste into Medium, then drop each image in at its marker. |
| `article-2-medium.md` | **Medium-ready copy of article 2** — images replaced with `[[ IMAGE n: ... ]]` markers (no tables). |
| `assets/` | The screenshots used in the articles (Playground UI, Mongo Compass, diagrams) — article 1 images at the top level, article 2 images in `assets/article2/`. |

## Running the example

Requires a local MongoDB (default: `mongodb://127.0.0.1:27017`) and Deno.

```bash
# from the repo root
deno run -A examples/whyLesan/performance.ts
```

The example connects to the `performance` database, registers the four models with
Lesan, and starts the server on the default Lesan port. Open the Lesan **Playground**
and try:

1. `addCountry` — create a few countries.
2. `addProvince` — pass a `countryId`; Lesan embeds the province into the country's
   `provinces` (newest first) and `provincesByPopulation` (highest population first)
   arrays automatically.
3. `addCity` — same idea with `countryId` + `provinceId`.
4. `getCountries` with `get: { provinces: 1, cities: 1 }` — read the whole tree in one
   request; notice the embedded arrays are already sorted and limited.

## Article files

- `article.md` / `article-2.md` → the source of truth (with image links + tables). All code matches
  the current Lesan API in `performance.ts`.
- `article-medium.md` / `article-2-medium.md` → **paste into Medium** (use the "Markdown to Medium"
  browser extension). Tables are pre-converted to bullets; each image is a `[[ IMAGE n: ... ]]`
  marker — upload the listed file at that spot. See the filename inside each marker.
- `article-reddit.md` / `article-2-reddit.md` → short versions for **Reddit** /
  HN-style comments.

## Related links

- Lesan source: <https://github.com/MiaadTeam/lesan>
- Lesan docs: <https://miaadteam.github.io/lesan/>
- Article 1 in the docs: <https://miaadteam.github.io/lesan/docs/advantages/why-lesan>
- Article 2 in the docs: <https://miaadteam.github.io/lesan/docs/advantages/relationship-economics>
- Head-to-head benchmark repo: <https://github.com/MiaadTeam/benchmark>
