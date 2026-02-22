import { number, string } from "../../src/npmDeps.ts";
import { TSchemas } from "../../src/core/models/mod.ts";
import { insertOne } from "../../src/core/odm/insert/insertOne.ts";
import { insertMany } from "../../src/core/odm/insert/insertMany.ts";
import { find } from "../../src/core/odm/find/find.ts";
import { updateOne } from "../../src/core/odm/update/updateOne.ts";
import { deleteOne } from "../../src/core/odm/delete/deleteOne.ts";
import { clearTestDb, startTestDb, stopTestDb } from "../utils/test-db.ts";

const schemasObj: TSchemas = {
  user: {
    pure: {
      _id: string(),
      name: string(),
      age: number(),
    },
    relations: {},
    mainRelations: {},
    relatedRelations: {},
  },
};

const NUM_DOCS = 1000;

async function runBenchmarks() {
  const runtime = typeof Deno !== "undefined"
    ? "Deno"
    : typeof Bun !== "undefined"
    ? "Bun"
    : "Node.js";

  console.log(`🚀 Starting ODM Benchmarks (Runtime: ${runtime})...`);

  const db = await startTestDb();
  await clearTestDb();

  const results: Record<string, any> = {};

  // 1. Insert One (Sequential)
  console.log(
    `\n➡️  Running insertOne (${NUM_DOCS} documents sequentially)...`,
  );
  let start = performance.now();
  for (let i = 0; i < NUM_DOCS; i++) {
    await insertOne({
      db,
      schemasObj,
      collection: "user",
      doc: { name: `User ${i}`, age: i % 100 },
    });
  }
  let end = performance.now();
  results["insertOne (Sequential)"] = {
    operations: NUM_DOCS,
    timeMs: (end - start).toFixed(2),
    opsPerSec: ((NUM_DOCS / (end - start)) * 1000).toFixed(2),
  };

  await clearTestDb();

  // 2. Insert Many (Batch)
  console.log(`➡️  Running insertMany (${NUM_DOCS} documents in batch)...`);
  const docs = Array.from({ length: NUM_DOCS }).map((_, i) => ({
    name: `Batch User ${i}`,
    age: i % 100,
  }));

  start = performance.now();
  await insertMany({
    db,
    schemasObj,
    collection: "user",
    docs,
  });
  end = performance.now();
  results["insertMany (Batch)"] = {
    operations: NUM_DOCS,
    timeMs: (end - start).toFixed(2),
    opsPerSec: ((NUM_DOCS / (end - start)) * 1000).toFixed(2),
  };

  // 3. Find (Fetch all)
  console.log(`➡️  Running find (Fetching ${NUM_DOCS} documents)...`);
  start = performance.now();
  await find({
    db,
    schemasObj,
    collection: "user",
    set: { page: 1, limit: NUM_DOCS },
    get: { name: 1, age: 1 },
  });
  end = performance.now();
  results["find (Fetch All)"] = {
    operations: 1,
    timeMs: (end - start).toFixed(2),
    opsPerSec: ((1 / (end - start)) * 1000).toFixed(2),
  };

  // 4. Update One (Sequential)
  console.log(`➡️  Running updateOne (${NUM_DOCS} documents sequentially)...`);
  const allUsers = await db.collection("user").find({}).toArray();
  start = performance.now();
  for (const user of allUsers) {
    await updateOne({
      db,
      collection: "user",
      filter: { _id: user._id },
      update: { $set: { name: `${user.name} Updated` } },
    });
  }
  end = performance.now();
  results["updateOne (Sequential)"] = {
    operations: NUM_DOCS,
    timeMs: (end - start).toFixed(2),
    opsPerSec: ((NUM_DOCS / (end - start)) * 1000).toFixed(2),
  };

  // 5. Delete One (Sequential)
  console.log(`➡️  Running deleteOne (${NUM_DOCS} documents sequentially)...`);
  start = performance.now();
  for (const user of allUsers) {
    await deleteOne({
      db,
      schemasObj,
      collection: "user",
      filter: { _id: user._id },
    });
  }
  end = performance.now();
  results["deleteOne (Sequential)"] = {
    operations: NUM_DOCS,
    timeMs: (end - start).toFixed(2),
    opsPerSec: ((NUM_DOCS / (end - start)) * 1000).toFixed(2),
  };

  await stopTestDb();

  console.log("\n=========================================");
  console.log(`📊 ODM Benchmark Summary (${runtime})`);
  console.log("=========================================\n");
  console.table(results);
}

runBenchmarks().catch((err) => {
  console.error("Benchmark failed:", err);
  if (typeof Deno !== "undefined") {
    Deno.exit(1);
  } else if (typeof process !== "undefined") {
    process.exit(1);
  }
});
