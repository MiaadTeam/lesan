# Lesan Examples

This directory contains the runnable examples that accompany the [documentation](https://miaadteam.github.io/lesan). Every folder here is referenced from a docs page — if you remove or rename one, update the docs too.

## Cross-Platform Starter Apps

A basic "Hello World" style application for each supported runtime. Each one initializes Lesan, connects to MongoDB, defines a model, creates an action (route), and starts the server. See the docs' [Cross-Platform Examples](/docs/guides/cross-platform-examples) page for a walkthrough.

### 1. Node.js Example (`/node-app`)

A standard Node.js setup using `tsx` to run TypeScript directly.

**To run:**

```bash
cd node-app
npm install
npm start
```

### 2. Bun Example (`/bun-app`)

A blazing fast setup utilizing Bun's native TypeScript execution and package management.

**To run:**

```bash
cd bun-app
bun install
bun start
```

### 3. Deno Example (`/deno-app`)

A modern Deno setup using `deno.json` for configuration and `npm:` specifiers for dependencies.

**To run:**

```bash
cd deno-app
deno task start
```

## Step-by-Step Document Example (`/document`)

The runnable companion to the [Tutorials](/docs/tutorials/add-more-relations) section — a numbered progression (01 → 10) that builds a country/city/user example one feature at a time: the simplest server, the first function, a first relation, more relations, `addRelation`/`removeRelation`, `find`/`findOne`, aggregation, `findOneAndUpdate`, `deleteOne`, and `insertMany`. Each file is referenced from its matching tutorial page.

## Microservice Example (`/microservice`)

A multi-app setup where a core app proxies `service: "ecommerce"` requests to a separate ecommerce server. Referenced from the [Microservices](/docs/advanced/microservices) advanced guide.

## Advanced Tutorial (`/advanced-tutorial`)

A complete, runnable hospital **procurement & warehouse management system**: 15 models, ~60 actions, JWT auth with role/feature access control, a configurable multi-step approval workflow, budget encumbrance, tendering, and store-to-store inventory. Includes a Deno setup (`deno task seed` / `start` / `test`), a 38-request hurl end-to-end test, and its own README + docs-site guide. The source of the [Procurement Workflow tutorial series](/docs/tutorials/procurement-workflow/00-overview).

## Performance Benchmark (`/whyLesan`)

A quick performance comparison demonstrating why Lesan is faster than traditional ORMs/GraphQL. (Documented separately.)