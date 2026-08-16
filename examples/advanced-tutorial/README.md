# Advanced Tutorial — Procurement Workflow

A complete, runnable **procurement and warehouse management system** built on
Lesan. It is the largest in-repo Lesan application you can study: **15 models**,
**~60 actions**, JWT authentication with role/feature-based access control, a
configurable multi-step approval workflow, budget encumbrance, tendering, and
store-to-store inventory tracking.

The app models a hospital supply chain. A unit requests goods, the request flows
through configurable approval steps, a tender is created and awarded, goods are
received into warehouses, inventory is tracked per store, and budget lines are
encumbered (and later spent) along the way.

> This is the runnable companion to the docs-site guide in
> `website/docs/guides/procurement-workflow.mdx` (rendered at
> `/docs/guides/procurement-workflow`). The code in this folder is the source of
> truth; the guide explains the same design in prose.

---

## Quick Start

**Prerequisites**

- [Deno](https://deno.com/) (tested on 1.x)
- MongoDB running on `mongodb://127.0.0.1:27017/` (no auth)

**Run**

```bash
cd examples/advanced-tutorial

deno task seed   # drop + reseed the `advancedTutorial` DB with the ghost admin
deno task start  # start the Lesan server on http://localhost:1380
deno task test   # run the 38-request end-to-end suite (needs hurl + running server)
```

| Task | Command | What it does |
|------|---------|--------------|
| `start` | `deno run -A mod.ts` | Boots the server (playground enabled in development) |
| `dev` | `deno run -A --watch mod.ts` | Same with hot reload |
| `seed` | `deno run -A http/_fixtures/seed.ts` | Drops the DB, inserts the ghost superuser |
| `test` | `hurl --test ... http/e2e.hurl` | Full end-to-end workflow test |

Environment variables: `MONGO_URI` (default `mongodb://127.0.0.1:27017/`),
`APP_PORT` (default `1380`), `ENV` (default `development`), `TOKEN_KEY` (JWT
secret, default `advancedTutorialSuperSecretKey`).

**Explore**

- Playground: `http://localhost:1380/playground` (development only)
- Interactive ODM/types: `declarations/selectInp.ts` is generated on boot
  (`typeGeneration: true`) — a superstruct schema for every model's selectable
  `get` projection.
- Static uploads: served under `/uploads`.

---

## Project Layout

```text
advanced-tutorial/
├── mod.ts                  # entry: lesan(), setDb, register all models, runServer
├── deno.json               # tasks + import aliases (@model, @lib)
├── models/
│   ├── mod.ts              # barrel re-exporting every model file
│   ├── user.ts             # one file per model: pure fields + relations + factory
│   ├── excludes.ts         # per-schema field-exclusion lists used by relations
│   ├── featureConstants.ts # the feature-enum array used by feature flags
│   └── ...                 # 15 model files total
├── src/
│   ├── mod.ts              # functionsSetup(): calls every domain's *Setup()
│   ├── <domain>/
│   │   ├── mod.ts          # e.g. userSetup(): registers all user acts
│   │   └── <act>/
│   │       ├── mod.ts      # coreApp.acts.setAct({ schema, actName, fn, validator, preAct })
│   │       ├── <act>.fn.ts # the ActFn implementation
│   │       └── <act>.val.ts# the superstruct validator (set / get)
│   └── ...                 # one folder per model domain
├── utils/                  # shared helpers, aliased as @lib
├── http/
│   ├── e2e.hurl            # the 38-request end-to-end test
│   └── _fixtures/seed.ts   # ghost-admin seed script
└── declarations/           # generated selectInp.ts (do not hand-edit)
```

**Import aliases** (`deno.json`)

| Alias | Points to |
|-------|-----------|
| `lesan` | `../../src/mod.ts` — the framework itself (this repo's source) |
| `@model` | `./models/mod.ts` |
| `@lib` | `./utils/mod.ts` |

### Wiring everything together (`mod.ts`)

```ts
import { lesan, MongoClient } from "lesan";
import { users, organizations, purchaseOrders, ... } from "@model";
import { functionsSetup } from "./src/mod.ts";

export const coreApp = lesan();
const db = await new MongoClient(MONGO_URI).connect().then((c) => c.db("advancedTutorial"));
coreApp.odm.setDb(db);

export const user = users();          // registering a model returns the ODM handle
export const purchaseOrder = purchaseOrders();
// ... one exported handle per model, used by every act in src/

export const { setAct, setService, getAtcsWithServices } = coreApp.acts;
export const { selectStruct, getSchemas } = coreApp.schemas;

functionsSetup();                     // registers every act

coreApp.runServer({ port: 1380, typeGeneration: true, playground: true,
                    staticPath: ["/uploads"], cors: ["http://localhost:3000"] });
```

> **Note:** Model registration order matters. Each `newModel` call registers one
> schema and then rebuilds the inverse (`relatedRelations`) map for **every**
> schema. All registrations stay together in `mod.ts` in dependency order, and
> the returned handles are re-exported so any act can import its model from
> `mod.ts`.

---

## Domain Overview

```text
organization ──> unit ──> store ──> inventory / stockMovement
        │                        (product stock per store)
        │
        ├──> process ──> processStep (ordered, AND/OR assignee groups)
        │        │
        │        v
purchaseOrder ── submit ──> stepApproval (per unit) ── evaluate ──> approve / reject
        │                                                         │
        ├── budgetLine (encumber -> spent on finalize)             v
        ├── tender ── addOffer ── award                        Approved / Rejected
        └── history[] (every performed action)                      │
                                                               finalize -> Completed
                                                               cancel   -> Cancelled
```

---

## The Models

### 1. `user` — authentication & authorization

Pure fields: `first_name`, `last_name`, `email`, `password`, `position`,
`isActive`, `isGhost`, `features[]`, `roles[]`. Relations: `avatar` (File),
`organizations[]`, `units[]`.

- A `role` is `{ roleId, name, scopeType?, scopeId? }` where `scopeType` is
  `organization | unit | store`. `grantAccess` checks the **active role** passed
  as `activeRoleId` in the request `set`.
- A `feature` is one of `feature_array` in `models/featureConstants.ts` (e.g.
  `canRegisterPurchaseOrder`, `canApprovePurchaseOrder`, `canManageBudget`).
- `isGhost` marks the bootstrap superuser — it bypasses every role/feature/scope
  check in `grantAccess`.
- `password` is excluded from API responses (model option `excludes: ["password"]`)
  and hashes are stored as hex SHA-256 (see `utils/password.ts`).
- A unique index on `email` and a text index on `first_name`/`last_name`/`email`
  are created at boot.

### 2. `file` — uploads

Pure fields: `name`, `type`, `path`, `size`, `mimeType`. Serves the upload API
(`uploadFile`, `getFile`, `getFiles`, `removeFile`) and backs `user.avatar` and
`purchaseOrder.attachments`.

### 3. `tag` — product tags

Pure fields: `name`, `color`. Relationless. Tags products via
`product.tags[]`; acts: `addTag`, `getTags`, `updateTag`, `removeTag`.

### 4. `organization` — the tenant / hospital

Pure fields: `name`, `code`, `description`, `parent?`. Self-referencing
`parent` relation (nested organizations). Central to role scoping: most workflows
are matched on `"organization._id"`.

### 5. `unit` — department or warehouse

Pure fields: `name`, `code`, `type` (`Department | Warehouse | Finance | Store`),
`description`. Relations: `organization`, `head` (User), `parentUnit`, plus the
implicit back-references `members`, `stores`, `purchaseOrders`, `processes`,
`stepApprovals`. Units are the assignee targets in `processStep.assigneeGroups`.

### 6. `product` — the item catalog

Pure fields: `name`, `code`, `description`, `price` and a text index on
`name`/`code`/`description` for `$text` search. Relations: `parent` (Product),
`tags[]`, and back-references `inventoryItems`, `purchaseOrders`.

### 7. `store` — a physical storage place

Pure fields: `name`, `code`, `address`. Relation: `unit` (the department that
owns the store). Stores hold `inventory[]` records.

### 8. `inventory` — stock level for one product in one store

Pure fields: `quantity`, `minQuantity`, `maxQuantity`, `batchNo`,
`expirationDate`, `location`. Relations: `store`, `product`, `createdBy`.
Acts use `utils/inventoryManager.ts` to keep balances consistent and to flag
low-stock items (`quantity < minQuantity`).

### 9. `stockMovement` — the inventory ledger

Pure fields: `quantity` (signed), `reason`, `balanceBefore`, `balanceAfter`,
`referenceType`, `referenceId`, `description`. Relations: `store`, `product`,
`createdBy`. Every `addStock` / `removeStock` / `transferStock` writes one (or
two) movements with the before/after balances.

### 10. `process` — approval workflow configuration

Pure fields: `name`, `description`, `status` (`Draft | Active | Archived`),
`version`, `isActive`. Relations: `organization`, `unit`, `product`, `createdBy`,
and back-references `steps`, `purchaseOrders`. A process is `Active` only after
`activateProcess`; PO submission resolves an active process automatically.

### 11. `processStep` — one step of a process

Pure fields: `name`, `description`, `stepType`
(`Approval | Review | Notification | Action | Delivery | Receipt | Payment`),
`order`, `required`, `groupsOperator` (`AND | OR`), and
`assigneeGroups: [{ operator, unitIds[] }]`. Relation: `process`. `groupsOperator`
combines groups; each group's `operator` combines its units. `evaluateStepStatus`
(`utils/stepEvaluator.ts`) turns the approvals of one step into
`pending | approved | rejected`.

### 12. `purchaseOrder` — the core procurement document

Pure fields: `title`, `description`, `estimatedAmount`, `status`
(`Draft | Pending | InProgress | Approved | Rejected | Completed | Cancelled`),
`currentStep`, `requestedAt`, `completedAt`, `history[]`. Relations: `requester`
(User), `organization`, `requestingUnit` (Unit), `product`, `process`,
`attachments` (File[]), `budgetLine`, `tender`. The workflow acts are all on this
model (see [The Approval Workflow](#the-approval-workflow)).

### 13. `stepApproval` — a single approval task for one unit

Pure fields: `status` (`pending | approved | rejected`), `comment`, `decidedAt`.
Relations: `purchaseOrder`, `processStep`, `unit`, `decidedBy` (User). Created by
`submit` for the first step and by `submitDecision` for each subsequent step.

### 14. `budgetLine` — budget allocation with encumbrance

Pure fields: `code`, `title`, `year`, `totalAllocated`, `totalEncumbered`,
`totalSpent`, `remainingBudget`. Relations: `organization`, `unit`, plus
`purchaseOrders` and `tenders` back-references. `submit` encumbers
(`totalEncumbered += amount`, `remainingBudget -= amount`), `finalize` converts
encumbrance to spend (`totalEncumbered -= amount`, `totalSpent += amount`), and
`cancel` releases it.

### 15. `tender` — competitive bidding

Pure fields: `title`, `status` (`Open | Awarded`), `deadline`, `description`,
`offers[]` (embedded `{ supplier, amount, ... }`). Relations: `organization`,
`createdBy`, and `purchaseOrder` back-reference. Acts: `addTender`, `addOffer`
(appends to `offers`), `award` (must match an existing offer), `getTenders`.

---

## Authentication & Access Control

Every protected act registers the same `preAct` pipeline:

```ts
preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
```

1. **`setTokens`** (`utils/setToken.ts`) — reads the `token` request header and
   verifies it. The JWT is signed with **WebCrypto HS256** (`utils/jwt.ts`), so it
   runs on Node, Bun and Deno with zero auth dependencies.
2. **`setUser`** (`utils/setUser.ts`) — loads the full user (pure fields +
   embedded `organizations` / `units` snapshots) and stores it on the request
   context via `coreApp.contextFns`.
3. **`grantAccess(checks)`** (`utils/grantAccess.ts`) — resolves the **active
   role** from `details.set.activeRoleId`, then requires at least one check to
   match: the role name in `roles`, every `features` flag via `hasFeature`, and an
   optional `getScope` matching the role's `scopeType`/`scopeId` (organization- or
   unit-scoped). `user.isGhost` short-circuits all checks.

Inside an `ActFn`, the current user is read from the context:

```ts
const { user }: MyContext = coreApp.contextFns.getContextModel() as MyContext;
```

`MyContext` (`utils/context.ts`) extends Lesan's `LesanContenxt` with the loaded
`user`, typed as `Merge<{ _id }, Partial<UserPure>>`.

---

## The Approval Workflow

### Configure a process

```text
addProcess ──> addProcessStep (xN, ordered) ──> activateProcess (status: Active)
```

### Lifecycle of a purchase order

```text
 add         submit        step approvals (per step)        finalize
Draft ──> (encumber budget) InProgress ──> Approved ──────> Completed
            │                  │  └── rejected -> Rejected
            └──> cancel -> Cancelled (release budget)
```

### `submit` (`src/purchaseOrder/submit/submit.fn.ts`)

1. Resolves the active process for the PO (its linked process, or the best match
   by requesting unit → product → organization fallback in
   `utils/resolveProcess.ts`).
2. Validates the process is `Active` and has steps.
3. Creates one `stepApproval` per unit in the **first** step's `assigneeGroups`.
4. Sets `status: "InProgress"`, `currentStep: 1`, pushes a `history` entry.
5. Encumbers the linked `budgetLine` by `estimatedAmount` (when present).

### `submitDecision` (`src/stepApproval/submitDecision/submitDecision.fn.ts`)

1. Marks the approval `approved`/`rejected` (with optional `comment`), links the
   deciding user.
2. Re-computes the step verdict with `evaluateStepStatus` over the unit-group
   operators.
3. `rejected` → PO becomes `Rejected`.
4. `approved` + no next step → PO becomes `Approved`.
5. `approved` + next step exists → creates approvals for the next step's units and
   advances `currentStep`.
6. Still mixed/pending → leaves the PO `InProgress` and records a `history` entry.

### `finalize` & `cancel`

- `finalize` requires `Approved`; it moves the encumbrance to `totalSpent`,
  sets `Completed`, records `completedAt`.
- `cancel` requires `Draft | Pending | InProgress`; it releases the encumbrance,
  sets `Cancelled`, records `completedAt` and the reason.

### History

Every state change is appended to `purchaseOrder.history[]` with the acting user,
name, role and timestamp — inspectable via the `getHistory` act.

---

## Inventory & Tendering

- **Inventory** — `addStock` / `removeStock` / `transferStock`
  (`src/inventory/*`) all delegate to `utils/inventoryManager.ts`, which adjusts
  balances, records `stockMovement` with before/after values, and supports
  low-stock flags. `transferStock` is a remove-then-add across two stores.
- **Tendering** — `addTender` creates an `Open` tender, `addOffer` appends a
  supplier offer to the embedded `offers[]`, and `award` flips the tender to
  `Awarded` (validating the winning supplier actually bid).

---

## Dashboard & Aggregation

`user.dashboardStatistic` is a single act that fans out a `$facet`-free set of
parallel aggregations (see `src/user/dashboardStatistic/dashboardStatistic.fn.ts`):

- `purchasingOrderCounts` — status histogram of POs, scoped to the active role's
  organization/unit.
- `prStatusDistribution` — the full status breakdown.
- `pendingApprovalCount` / `recentApprovals` — pending step-approval work.
- `finance` / `budgetBurnDown` — budget aggregates.
- `inventorySummary` / `inventoryLowStock` — stock overview and out-of-stock items.
- `prMonthlyTrend` / `stockMovementSummary` — time and ledger summaries.

The requested fields are driven by the client's `get` projection — only the
aggregations the client asks for run.

---

## The End-to-End Test (`http/e2e.hurl`)

`deno task test` runs hurl against a seeded server and drives the whole domain:

| Section | Flow |
|---------|------|
| 0 | `login` as the ghost user, capture token + role id |
| 1–4b | organization, units, products, tags, and tagging a product |
| 5–6b | stores, inventory (`addStock`), and a transfer between stores |
| 7–7c | process → steps → `activateProcess` |
| 8–9 | budgetLine, tender (`addOffer`, `award`) |
| 10–10c | create a PO, `gets`/`count`, `submit` + budget encumbrance check |
| 11 | step approvals: capture approval 1, `submitDecision` twice → `Approved` |
| 12–13 | `finalize` → `Completed`, verify `history[]` |
| 14 | a second PO cancelled → budget released, encumbrance moved to `totalSpent` |
| 15 | `dashboardStatistic` counts |

Run it after seeding: `deno task seed && deno task start` then `deno task test`.

---

## Design Patterns Worth Copying

- **Client-driven `get` projections.** Validators build `get` with
  `selectStruct(model, depth)`; relations must be projected as objects
  (`{ "budgetLine": { "_id": 1 } }`), pure fields as `1`.
- **`defaulted(...)` on pure fields only documents the intent.** The ODM's
  `insertOne` does not run superstruct `create`, so model defaults are **not**
  applied on insert. The add-acts set defaults explicitly (e.g. PO `status` is
  defaulted to `"Draft"` in `add.fn.ts`).
- **Relations are denormalized snapshots.** A relation stores a *pure* snapshot of
  the target inside the source document, plus the inverse snapshot in the target
  (via `relatedRelations`). `excludes.ts` trims heavy fields (e.g. `password`,
  nested `history`) from those snapshots.
- **Business logic lives in acts, not in the model.** Cross-document invariants
  (step evaluation, budget math, inventory balances) are explicit
  `findOneAndUpdate` + `addRelation` steps inside `ActFn`s — there are no DB
  triggers.
- **One folder per act**, always with `mod.ts` (`setAct`), `<act>.fn.ts`
  (implementation), `<act>.val.ts` (superstruct validator).
- **Errors** are `throwError(msg)` (`utils/throwError.ts`), surfaced as
  `{ success: false, body: { message } }`.
