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
import { deleteMethod } from "../delete.ts";

test({
  name: "deleteMethod should delete multiple documents matching the query",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { name: "Syd", role: "admin" },
      { name: "Ali", role: "user" },
      { name: "Reza", role: "user" },
    ]);

    const result = await deleteMethod(db, "user", { role: "user" });

    assertExists(result);
    assertEquals(result.deletedCount, 2);

    const remainingDocs = await db.collection("user").find().toArray();
    assertEquals(remainingDocs.length, 1);
    assertEquals(remainingDocs[0].name, "Syd");
  },
});

test({
  name: "deleteMethod should delete all documents if empty query is provided",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { name: "Syd", role: "admin" },
      { name: "Ali", role: "user" },
    ]);

    const result = await deleteMethod(db, "user", {});

    assertExists(result);
    assertEquals(result.deletedCount, 2);

    const remainingDocs = await db.collection("user").find().toArray();
    assertEquals(remainingDocs.length, 0);
  },
});

test({
  name:
    "deleteMethod should not delete anything if no documents match the query",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { name: "Syd", role: "admin" },
    ]);

    const result = await deleteMethod(db, "user", { role: "user" });

    assertExists(result);
    assertEquals(result.deletedCount, 0);

    const remainingDocs = await db.collection("user").find().toArray();
    assertEquals(remainingDocs.length, 1);
  },
});

test({
  name: "deleteMethod should throw an error if db is not provided",
  async fn() {
    await assertRejects(
      async () => {
        await deleteMethod(null as any, "user", { name: "Syd" });
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
