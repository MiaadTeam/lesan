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
import { aggregation } from "../aggregation.ts";
import { schemaMockData } from "../../../models/mainRelations/__test__/getMainRelations.test.ts";
import { ObjectId } from "../../../../npmDeps.ts";

test({
  name: "aggregation should execute a simple pipeline without projection",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    await db.collection("user").insertMany([
      { _id: new ObjectId(), name: "Syd", age: 30, role: "admin" },
      { _id: new ObjectId(), name: "Ali", age: 25, role: "user" },
      { _id: new ObjectId(), name: "Reza", age: 35, role: "admin" },
    ]);

    const pipeline = [
      { $match: { role: "admin" } },
      { $group: { _id: "$role", totalAge: { $sum: "$age" } } },
    ];

    const cursor = aggregation({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      pipeline,
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 1);
    assertEquals(results[0]._id, "admin");
    assertEquals(results[0].totalAge, 65); // 30 + 35
  },
});

test({
  name:
    "aggregation should append generated projection stages when projection is provided",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    // Insert a country
    const countryId = new ObjectId();
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    // Insert a city
    const cityId = new ObjectId();
    await db.collection("city").insertOne({
      _id: cityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: { _id: countryId, name: "Iran", abb: 98, population: 85000000 },
    });

    // Insert a user with relations
    const userId = new ObjectId();
    await db.collection("user").insertOne({
      _id: userId,
      name: "Syd",
      age: 30,
      address: "Tehran, Iran",
      country: { _id: countryId, name: "Iran", abb: 98, population: 85000000 },
      livedCities: [
        { _id: cityId, name: "Tehran", abb: 21, population: 15000000 },
      ],
    });

    const pipeline = [
      { $match: { _id: userId } },
    ];

    // We request a nested projection: user -> country -> name
    // This should trigger generateProjection to add a $lookup stage
    const projection = {
      name: 1,
      country: {
        name: 1,
      },
    };

    const cursor = aggregation({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      pipeline,
      projection,
    });

    const results = await cursor.toArray();

    assertExists(results);
    assertEquals(results.length, 1);

    const doc = results[0];
    assertEquals(doc.name, "Syd");
    assertEquals(doc.age, undefined); // Should be excluded by projection
    assertExists(doc.country);
    assertEquals(doc.country.name, "Iran");
    assertEquals(doc.country.abb, undefined); // Should be excluded by projection
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
