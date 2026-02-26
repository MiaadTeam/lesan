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
import { findOne } from "../findOne.ts";
import { ObjectId } from "../../../../npmDeps.ts";

test({
  name: "findOne should return a single document matching the filter",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const docId = new ObjectId();
    await db.collection("user").insertOne({
      _id: docId,
      name: "Syd",
      age: 30,
      role: "admin",
    });

    await db.collection("user").insertOne({
      _id: new ObjectId(),
      name: "Ali",
      age: 25,
      role: "user",
    });

    const result = await findOne({
      db,
      collection: "user",
      filters: { _id: docId },
    });

    assertExists(result);
    assertEquals(result!._id.toString(), docId.toString());
    assertEquals(result!.name, "Syd");
    assertEquals(result!.age, 30);
  },
});

test({
  name: "findOne should return null if no document matches the filter",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentId = new ObjectId();

    const result = await findOne({
      db,
      collection: "user",
      filters: { _id: nonExistentId },
    });

    assertEquals(result, null);
  },
});

test({
  name: "findOne should apply projection correctly",
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

    const result = await findOne({
      db,
      collection: "user",
      filters: { _id: docId },
      projection: { name: 1, role: 1, _id: 0 },
    });

    assertExists(result);
    assertEquals(result!.name, "Syd");
    assertEquals(result!.role, "admin");
    assertEquals(result!.age, undefined);
    assertEquals(result!.secretKey, undefined);
    assertEquals(result!._id, undefined);
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
