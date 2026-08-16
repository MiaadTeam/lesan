# AGENTS.md — Lesan Framework Core Development

> **This document is for developers working ON the Lesan framework itself** — not for building applications *with* Lesan.
> Lesan is a cross-platform (Node.js, Bun, Deno) TypeScript web framework + ODM (Object Document Mapper) for MongoDB, offering GraphQL-like client-driven data retrieval without the query-language overhead.
> This repo is a fork of [MiaadTeam/lesan](https://github.com/MiaadTeam/lesan) (`upstream`); the goal is to eventually merge changes back via a pull request to the main project.

---

## Repo & Git Workflow

- `origin` → your fork (`https://github.com/hemedani/lesan-1.git`), `upstream` → `https://github.com/MiaadTeam/lesan.git`.
- Before starting work, sync with upstream: `git fetch upstream` then rebase/merge `upstream/main` into your working branch.
- Feature branches live in this fork; PRs go to `upstream`.
- **Never commit generated/dist artifacts** unless the change intentionally ships them: `dist/`, `declarations/`, `deno.lock`, `node_modules/` are generated. (Exception: `src/server/playground/dist/bundleContent.ts` IS published — see `deno.json` publish config.)

## What This Project Is (and Is Not)

- **Is:** a reusable framework. The public surface is exported from `src/mod.ts` (acts types, `lesan()`, model types, re-exported `superstruct` + `mongodb`, `TLesanBody`). Distribution is dual: npm (`@hemedani/lesan`) via `tsup` → `dist/`, and JSR (`@hemedani/lesan`) from raw TypeScript source.
- **Is not:** an application. There are no "models/actions" business folders to grow. New code goes into the framework's `src/` modules (core ODM, acts, server, platform adapters).
- **Key constraint — JSR "slow types":** JSR publishes TypeScript source directly and rejects ambiguous/explicit-`any` public types. Public functions must have **explicit return types**; avoid widening to `any` in exported signatures. The internal codebase is loose (`strict: false` in `tsconfig.json`) but the *public API* must stay JSR-clean.

## Project Structure

```
src/
├── lesan.ts                    # lesan() factory — wires schemas/acts/odm/server over shared closures
├── mod.ts                      # public barrel exports
├── types.ts                    # TLesanBody, Details, objectIdValidation, LesanContenxt
├── npmDeps.ts                  # SINGLE re-export wall for superstruct + mongodb (runtime & types)
├── global.d.ts                 # `declare var Deno/Bun: any` shims
├── context.ts                  # contextFns — module-level mutable request context
├── core/
│   ├── acts/                   # setAct/setService/getAct(s)/getServiceKeys/getActsWithServices
│   ├── models/                 # schema registry, pure/relation/relatedRelations/mainRelations, selectStruct, selectInp, createProjection
│   ├── odm/                    # the ODM: newModel + insert/find/update/delete/relation/aggregation engines
│   ├── types/                  # generateSchemTypes → declarations/selectInp.ts + lesanApi client
│   └── utils/                  # serveLesan (request pipeline), checkWants (body parsing), HttpError, throwError
├── server/                     # lesanServer (runServer), cors, serveStatic, playground/ (Preact UI)
├── platform/                   # runtime-agnostic interfaces: fs, http, env, runtime, bundler
└── adapters/                   # node/ bun/ deno/ — concrete implementations of the platform interfaces
```

Supporting dirs: `examples/` (per-runtime + microservice + step-by-step learning apps), `tests/` (cross-runtime test infra, contract tests, benchmarks, fixtures, playground E2E), `templates/` (adapter + adapter-test scaffolding), `docs/` + `website/` (docs site, Docusaurus), `pages/` (legacy Next.js site).

## The Core Architecture (Read This First)

### Closure-based wiring (`src/lesan.ts`)

`lesan()` creates two mutable registries and captures them in closures — this is the DI mechanism:

```ts
const schemasObj: TSchemas = {};      // filled by odm.newModel()
const actsObj: Services = { main: {} }; // filled by acts.setAct()/setService()
return { schemas, acts, odm, runServer, contextFns, generateSchemTypes };
```

- **`schemasObj`** is mutated by `odm.newModel(name, pureFields, relations, options)` (`src/core/odm/newModel/mod.ts`). `newModel` registers pure fields (`_id` + user fields), computes `mainRelations`, and calls `rebuildAllRelatedRelations()` to derive the inverse `relatedRelations` map for EVERY schema. **Order of `newModel` calls matters** for cross-schema back-references.
- **`actsObj`** is mutated by `setAct`/`setService`. A service value can be an `Acts` object **or a string URL** → Lesan proxies POST requests to that remote service (rewriting `service: "main"`).
- **`runServer`** captures both registries; `typeGeneration: true` triggers `generateSchemTypes()` which writes `declarations/selectInp.ts`.

### Request lifecycle (`POST /lesan`)

`server/mod.ts` handler → `lesanFns(actsObj).serveLesan(req, port, cors)` (`src/core/utils/serveLesan.ts`):
1. `addHeaderToContext(req.headers)` → `checkServices`: `parsBody` (JSON or multipart; files land in `details.set.formData`), validate `service` against registered keys; if service is a URL → forward; else `checkModels`.
2. `checkModels` validates `model` → `checkActs` validates `act` → `runAct`.
3. `runAct`: fetch act → run **`preValidation`** hooks → validate with superstruct (`create` if `validationRunType === "create"`, else `assert`) → run **`preAct`** hooks → `act.fn(body)`.
4. Response: `{ body: result, success: true }`; errors → `{ body: { message }, success: false }` with `HttpError.status || 501`.

Context flows through `contextFns` (`src/context.ts`) — a **module-level mutable object** set before the pipeline and read inside `fn`. Used by the Satek-style apps for auth (`setUser`, tokens, activeRole). Be careful: it is global per-process, not per-request-isolated.

### The relationship engine (heart of the ODM)

Relations are **one-directional in definition, bi-directional in storage**: a relation stores a *pure snapshot* (embedded, via `createProjection(schemasObj, name, "Pure")`) of the target doc inside the source doc, and the reverse `relatedRelations` snapshot inside the target doc. Keeping these in sync is manual and explicit — there are no DB triggers:

- **Write helpers** (`src/core/odm/utils/insert/`): `handleSingleRelation`, `handleMultiRelation`, `proccessRelatedRelation`. Used by `insertOne` and `addRelation`.
- **Update/delete sync** (`src/core/odm/update/findOneAndUpdate.ts`): `proccessUpdateOrDeleteRelations` rebuilds back-references; forward + reverse sync both happen.
- **Delete** (`src/core/odm/delete/deleteOne.ts`): `deleteOwnRelation` (remove snapshots from related docs) + `deleteRelatedRelation` (block deleting a parent while children reference it, unless `hardCascade: true` → recursive `proccessDeletion`).
- **Limit/sort window maintenance**: when a `multiple` back-ref array is at its `limit`, code queries the source collection for the "next best" doc by the sort field and refills via `$setUnion`/`$filter`/`$sortArray`/`$slice` pipelines (see `generateUpdateFilter`, `generateRelationUpdatePipeline`, `generateRemoveRelationRelationFilter`, `processRemoveRelatedRelations`).
- **Deep projection** (`src/core/odm/aggregation/generateProjection.ts`): builds `$lookup`/`$unwind`/`$project` pipelines when a client `get` projection penetrates beyond one step (relations are embedded shallowly; deep docs are fetched).
- **`getNumericPosition`** (`src/core/utils/getNumericPosition.ts`) is currently **dead code** (binary-search insert position) — do not rely on it.

### Platform abstraction (cross-runtime)

`src/platform/adapters/index.ts` calls `detectRuntime()` once and exports the concrete `fs`, `env`, `http`, `bundler` singletons. The core (`src/core`, `src/server`) imports ONLY from `src/platform/adapters/index.ts` — it must never touch `process`, `Deno`, `Bun`, `node:*`, etc. directly. All runtime-specific code lives in `src/adapters/{node,bun,deno}/{fs,env,http,bundler}.adapter.ts`.

Rules for adapters:
- Keep each adapter to its own runtime's native APIs (Deno: `Deno.serve`/`Deno.readTextFile`; Bun: `Bun.serve`/`Bun.file`; Node: `node:http`/`node:fs/promises`). Node bundler uses `esbuild`; Deno bundler uses dynamic `jsr:@deno/emit`; Bun bundler uses `Bun.build`.
- Every adapter must pass the shared **contract tests** (`tests/platform/*.contract.test.ts`) — behavior, not implementation.
- All requests/responses use **Web-standard `Request`/`Response`**.

## Conventions (Critical)

- **Imports use explicit `.ts` extensions** in all relative paths (`from "./mod.ts"`), enabled by `allowImportingTsExtensions` — required for Deno/JSR. Do not use extensionless relative imports.
- **Never import runtime globals in core.** Use the platform adapters.
- **Dependencies**: only `mongodb`, `superstruct`, `esbuild` (runtime) plus dev deps. Everything is re-exported through `src/npmDeps.ts` — import from there, never directly from `mongodb`/`superstruct` inside `src/core`.
- **Errors**: use `throwError(msg)` (`src/core/utils/throwError.ts`) in ODM/model code; `HttpError` carries HTTP `status` for the server layer. Error strings are lowercase and terse (many contain typos — some tests assert on exact messages; don't "fix" them casually without updating tests).
- **Validation is superstruct everywhere**: model pure fields, act validators (`object({ set, get })`), and runtime checks via `assert(x, enums(keys), msg)`. Act `get` validators are built with `coreApp.schemas.selectStruct(schema, depth)`; `selectStruct` depth can be a number (uniform) or object (per-relation).
- **ODM function signatures**: async, single destructured options object, e.g. `{ db, schemasObj, collection, ... }`, and typically return `projection ? findOne(...) : { _id }`.
- **`_id` is always a client-side-generated `ObjectId`** before insert.
- **Comments**: sparse; code reads tersely. Match surrounding style; don't add noise. Some TODO strings are in Persian — keep them or translate, don't delete.
- **Public API**: explicit return types, no `any` leaks (JSR). Internal code may be loose (`strict: false`), but don't widen public types.
- `tsconfig.json` uses `strict: false` and excludes `tests/`, `src/adapters/deno/**`, `src/adapters/bun/**` (they're type-checked by their own runtimes).

## Build, Test & Run

### Test commands (from `package.json`)

```bash
npm run test:node     # tsx --test tests/adapters/node/*.test.ts src/core/**/*.test.ts
npm run test:bun      # bun test tests/adapters/bun/*.test.ts src/core/**/*.test.ts
npm run test:deno     # deno test -A tests/adapters/deno/*.test.ts src/core/**/*.test.ts
npm run test          # all three
```

- The cross-runtime `test()` dispatcher lives in `tests/utils/test-runner.ts` (maps to `Deno.test` / `bun:test` / `node:test`). Test files under `src/core/**/__tests__/` use both `__tests__` and `__test__` dir names — keep whatever the surrounding folder uses.
- **ODM integration tests need a MongoDB**: `tests/utils/test-db.ts` boots `mongodb-memory-server` (binary 6.0.14) automatically via `startTestDb()`/`stopTestDb()`/`clearTestDb()`. `tests/utils/mock-db.ts` is an in-memory fake for unit-level tests without a server.
- **Contract tests** (`tests/platform/`, 79 total): every adapter must pass them; each runtime has a thin runner in `tests/adapters/{runtime}/*.test.ts` (Bun runners guard on `typeof Bun !== "undefined"`).

### Build

```bash
npm run build       # tsup → dist/ (ESM index.js + CJS index.cjs + .d.ts/.d.cts), external: mongodb/superstruct/esbuild
```

`tsup.config.ts` — entry `src/mod.ts`, `splitting: false`, `shims: true`, sourcemaps. Deno/JSR publishing needs no build step (raw TS source, `deno.json` publish include: `src`, `mod.ts`, `README.md`, `LICENSE`).

### Benchmarks

```bash
npm run bench:http  # autocannon against a spawned Lesan server (Node/Bun/Deno) → results.json
npm run bench:odm   # insertOne/insertMany/find/update/delete against test db
```

### Playground bundle (only when you change the playground UI)

`src/server/playground/` is a Preact UI. Dev serves it live via the bundler adapter; production inlines strings from `dist/bundleContent.ts`. After editing `hydrate.tsx`/`comp/`, regenerate with the esbuild script (`src/server/playground/esbuild.ts`) so `bundleContent.ts` is committed (it IS published).

## Testing Checklist Before Finishing Work

1. Run tests for the runtime(s) you touched: `npm run test:node` (and `test:bun`/`test:deno` if cross-runtime impact).
2. If you changed a platform interface or an adapter, run the full contract suite for that interface across runtimes.
3. If you changed public types/signatures, verify `npm run build` still emits clean `.d.ts` and no `any` leaks (JSR constraint).
4. If you touched the ODM relation logic, exercise `insertOne`/`insertMany`/`addRelation`/`removeRelation`/`findOneAndUpdate`/`deleteOne` (+ `hardCascade`) tests — relations are the highest-risk area.
5. Don't add new dependencies without good reason; route them through `npmDeps.ts` if they're core.

## Known Rough Edges (respect, don't "improve" casually)

- `src/core/odm/insert/insertMany.ts` duplicates single/multiple relation logic in 4 blocks instead of reusing `handle*` helpers.
- `src/core/odm/utils/insert/handleMultiRelation.ts:88` early-returns after the **first** flagged relatedRelation.
- `updateOne`, `updateById`, `deleteMethod` exist but are **not wired into `newModel`** (commented out); the mutation surface is `findOneAndUpdate` + `deleteOne` (+ relations).
- `findOneAndUpdate`'s reverse-sync multiple branch omits `$slice` even when a `limit` exists.
- `contextFns.addContext` nests its argument under key `con` (likely bug) — check before relying on it.
- Dead/leftover vars: `populatedMainRelations`, `somethingIsWrong` in insert files; `getNumericPosition` is unused.
- `src/core/models/selectInp.ts` is an orphan (exported but not wired into `newModel`).

## Useful Reference Files

- `QWEN.md` — in-depth framework documentation (validation patterns, relation rules, API structure). Read it alongside this file.
- `src/core/odm/newModel/mod.ts` — the model factory + `rebuildAllRelatedRelations`.
- `src/core/utils/serveLesan.ts` — full request pipeline.
- `src/core/types/mod.ts` — the type-generation algorithm → `declarations/selectInp.ts`.
- `src/platform/README.md` — platform architecture diagram + design principles.
- `templates/adapter-template.ts` + `adapter-test-template.ts` — scaffolding for new adapters (documents Phase-2 lessons: resource cleanup in `finally`, body consumption, async hygiene, error mapping).
- `RELEASE.md` — release process (bump `package.json` + `deno.json`, tag `v*.*.*`, GitHub Actions publishes npm + JSR).

## Git commit

When I say `git commit` please do the following:

```
Please act as an expert Git commit assistant. Your task is to carefully review the recent project changes (e.g., via git diff or staged files) and generate a series of clear, conventional commit messages following best practices. Use Gitmoji emojis at the start of each commit message to make them more expressive and readable (e.g., :sparkles: for new features, :bug: for fixes).
Key guidelines:
Conventional structure: Each commit message should start with a Gitmoji, followed by a type (e.g., feat, fix, refactor, docs, test, chore), a scope in parentheses if applicable (e.g., (ui)), a colon, and a concise description. Include a body if needed for more details, and reference issues if relevant.
Grouping: Break changes into logical, atomic commits. Group related files or changes together (e.g., one commit for UI updates, another for bug fixes), rather than lumping everything into a single commit. Avoid overly large or unrelated groupings.
Execution: Directly output and execute the necessary Git shell commands (e.g., git add for specific files, followed by git commit -m "message") to apply these commits. Do not ask for confirmation, additional input, or perform unrelated actions like rebasing, squashing, or amending existing commits. Only create new commits on the current branch.
Best practices: Ensure messages are imperative, concise (50 chars for subject), and descriptive. Focus on what changed and why, not how.
Additional notes:
- Use present tense for the subject line (e.g., "Add feature" not "Added feature")
- Be specific about what was changed (e.g., "Fix user login validation" rather than just "Fix bug")
- When making breaking changes, indicate this with an exclamation mark after the type (e.g., "feat!: Remove deprecated API endpoint")
- Reference issue numbers if applicable (e.g., "fix(auth): Resolve login issue #123")
- For multiple related changes, create separate commits for each logical change
- When updating dependencies, mention the specific packages (e.g., "chore(deps): Update react and react-dom to v18")
- For documentation changes, be clear about what documentation was added or updated
- When changing configuration files, explain the purpose of the changes
Proceed step-by-step: First, analyze the changes, then propose the grouped commits, and finally execute the Git commands in sequence.
```

⚠️ **WARNING**: Under no circumstances should you ever use the `git reset` command when performing git operations, as it can permanently erase work that took days to complete. This command has caused significant data loss in the past and should be avoided entirely.

