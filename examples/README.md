# Lesan Examples

This directory contains simple, runnable examples demonstrating how to use the Lesan framework across different JavaScript runtimes.

## Cross-Platform Examples

We have provided a basic "Hello World" style application for each supported runtime. These examples demonstrate how to initialize Lesan, connect to MongoDB, define a model, create an action (route), and start the server.

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

---

## Advanced Examples

- A very simple [microservice](https://github.com/MiaadTeam/lesan/tree/main/examples/simpleMircoservice) (Note: This example may be using an older, Deno-only version of Lesan).
