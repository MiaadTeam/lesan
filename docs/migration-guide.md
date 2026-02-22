# Migration Guide: Upgrading to Cross-Platform Lesan

Welcome to the new era of Lesan! We have completely rewritten the core architecture to be **runtime-agnostic**, meaning Lesan now natively supports **Node.js**, **Bun**, and **Deno** with zero configuration.

If you are an existing user of Lesan on Deno, this guide will help you migrate your project to the new cross-platform version.

---

## 1. Updating Imports

The biggest change is how you import Lesan and its dependencies. We have moved away from `deno.land/x` and are now publishing Lesan to the npm registry. This allows all runtimes to share the same package.

### Old Way (Deno Only)

```typescript
import { lesan, string, number } from "https://deno.land/x/lesan@vX.X.X/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@vX.X.X/mod.ts"; // Or similar Deno MongoDB driver
```

### New Way (Cross-Platform)

You should now use `npm:` specifiers in Deno, or standard bare specifiers in Node.js and Bun.

**For Deno:**

```typescript
import { lesan, string, number } from "npm:lesan";
import { MongoClient } from "npm:mongodb"; // We now use the official Node.js MongoDB driver via npm
```

**For Node.js / Bun:**

```typescript
import { lesan, string, number } from "lesan";
import { MongoClient } from "mongodb";
```

---

## 2. MongoDB Driver Changes

Because we are now cross-platform, we have standardized on the official `mongodb` npm package. If you were previously using a Deno-specific MongoDB driver (like `deno_mongo`), you will need to update your connection logic and potentially some specific driver methods.

### Old Way (Deno Mongo)

```typescript
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");
const db = client.database("my_db");

app.odm.setDb(db);
```

### New Way (Official MongoDB Driver)

```typescript
import { MongoClient } from "npm:mongodb"; // or "mongodb" in Node/Bun

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();
const db = client.db("my_db"); // Note: .db() instead of .database()

app.odm.setDb(db);
```

---

## 3. Running Your Application

The way you start your application depends on the runtime you choose.

### Deno

You can still run your application exactly as before, but you may want to use a `deno.json` file to manage your imports.

```bash
deno run -A main.ts
```

### Node.js

To run TypeScript files directly in Node.js, we recommend using `tsx`.

```bash
npm install -D tsx
npx tsx main.ts
```

### Bun

Bun natively supports TypeScript execution.

```bash
bun run main.ts
```

---

## 4. Core API Changes

The core Lesan API (`app.odm.newModel`, `app.acts.setAct`, `app.runServer`) remains **100% backwards compatible**. You do not need to rewrite your models, validators, or action functions.

The only changes are under the hood: Lesan now automatically detects your runtime (Node, Bun, or Deno) and injects the appropriate adapters for the file system, HTTP server, and bundler.

---

## 5. Type Generation

Type generation works exactly as before. When you run your server with `typeGeneration: true`, Lesan will generate the TypeScript definitions for your models and actions.

```typescript
app.runServer({
  port: 8080,
  typeGeneration: true, // Works seamlessly across all runtimes
  playground: true,
});
```

---

## Need Help?

If you encounter any issues during migration, please open an issue on our [GitHub repository](https://github.com/MiaadTeam/lesan/issues). We are here to help!
