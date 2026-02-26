import { test } from "../../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertExists,
} from "../../../../../tests/utils/assert.ts";
import {
  clearTestDb,
  startTestDb,
  stopTestDb,
} from "../../../../../tests/utils/test-db.ts";
import { find } from "../find.ts";
import { ObjectId } from "../../../../npmDeps.ts";

test({
  name: "find should return multiple documents matching the filter",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { _id: new ObjectId(), name: "Syd", role: "admin", age: 30 },
      { _id: new ObjectId(), name: "Ali", role: "user", age: 25 },
      { _id: new ObjectId(), name: "Reza", role: "admin", age: 35 },
    ]);

    const cursor = find({
      db,
      collection: "user",
      filters: { role: "admin" },
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 2);

    const names = results.map((r) => r.name);
    assertEquals(names.includes("Syd"), true);
    assertEquals(names.includes("Reza"), true);
    assertEquals(names.includes("Ali"), false);
  },
});

test({
  name: "find should return an empty array if no documents match",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertOne({
      _id: new ObjectId(),
      name: "Syd",
      role: "admin",
    });

    const cursor = find({
      db,
      collection: "user",
      filters: { role: "superadmin" },
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 0);
  },
});

test({
  name: "find should apply projection correctly",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const docId = new ObjectId();
    await db.collection("user").insertOne({
      _id: docId,
      name: "Syd",
      age: 30,
      role: "admin",
      secretKey: "super-secret",
    });

    const cursor = find({
      db,
      collection: "user",
      filters: { _id: docId },
      projection: { name: 1, role: 1, _id: 0 },
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 1);

    const doc = results[0];
    assertEquals(doc.name, "Syd");
    assertEquals(doc.role, "admin");
    assertEquals(doc.age, undefined);
    assertEquals(doc.secretKey, undefined);
    assertEquals(doc._id, undefined);
  },
});

test({
  name: "find should apply options like sort and limit correctly",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { _id: new ObjectId(), name: "User1", age: 20 },
      { _id: new ObjectId(), name: "User2", age: 30 },
      { _id: new ObjectId(), name: "User3", age: 25 },
      { _id: new ObjectId(), name: "User4", age: 40 },
    ]);

    const cursor = find({
      db,
      collection: "user",
      filters: {},
      options: {
        sort: { age: -1 }, // Sort descending by age
        limit: 2, // Only return top 2
      },
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 2);

    // The oldest two should be User4 (40) and User2 (30)
    assertEquals(results[0].name, "User4");
    assertEquals(results[0].age, 40);
    assertEquals(results[1].name, "User2");
    assertEquals(results[1].age, 30);
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
