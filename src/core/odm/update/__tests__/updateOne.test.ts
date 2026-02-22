import { test } from "../../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertExists,
  assertRejects,
} from "../../../../../tests/utils/assert.ts";
import {
  clearTestDb,
  startTestDb,
  stopTestDb,
} from "../../../../../tests/utils/test-db.ts";
import { updateOne } from "../updateOne.ts";
import { ObjectId } from "../../../../npmDeps.ts";

test({
  name: "updateOne should update a single document matching the filter",
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

    const result = await updateOne({
      db,
      collection: "user",
      filter: { _id: docId },
      update: { $set: { age: 31, role: "superadmin" } },
    });

    assertExists(result);
    assertEquals(result.matchedCount, 1);
    assertEquals(result.modifiedCount, 1);

    const updatedDoc = await db.collection("user").findOne({ _id: docId });
    assertExists(updatedDoc);
    assertEquals(updatedDoc!.name, "Syd");
    assertEquals(updatedDoc!.age, 31);
    assertEquals(updatedDoc!.role, "superadmin");

    // Ensure the other document was not updated
    const otherDoc = await db.collection("user").findOne({ name: "Ali" });
    assertExists(otherDoc);
    assertEquals(otherDoc!.age, 25);
    assertEquals(otherDoc!.role, "user");
  },
});

test({
  name:
    "updateOne should not modify anything if no document matches the filter",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const docId = new ObjectId();
    await db.collection("user").insertOne({
      _id: docId,
      name: "Syd",
      age: 30,
    });

    const nonExistentId = new ObjectId();

    const result = await updateOne({
      db,
      collection: "user",
      filter: { _id: nonExistentId },
      update: { $set: { age: 31 } },
    });

    assertExists(result);
    assertEquals(result.matchedCount, 0);
    assertEquals(result.modifiedCount, 0);

    const originalDoc = await db.collection("user").findOne({ _id: docId });
    assertExists(originalDoc);
    assertEquals(originalDoc!.age, 30); // Should remain unchanged
  },
});

test({
  name: "updateOne should apply options like upsert correctly",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentId = new ObjectId();

    const result = await updateOne({
      db,
      collection: "user",
      filter: { _id: nonExistentId },
      update: { $set: { name: "New User", age: 20 } },
      options: { upsert: true },
    });

    assertExists(result);
    assertEquals(result.matchedCount, 0);
    assertEquals(result.modifiedCount, 0);
    assertEquals(result.upsertedCount, 1);
    assertExists(result.upsertedId);

    const upsertedDoc = await db.collection("user").findOne({
      _id: result.upsertedId!,
    });
    assertExists(upsertedDoc);
    assertEquals(upsertedDoc!.name, "New User");
    assertEquals(upsertedDoc!.age, 20);
  },
});

test({
  name: "updateOne should throw an error if db is not provided",
  async fn() {
    await assertRejects(
      async () => {
        await updateOne({
          db: null as any,
          collection: "user",
          filter: { name: "Syd" },
          update: { $set: { age: 31 } },
        });
      },
      Error,
      "No database connection",
    );
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
