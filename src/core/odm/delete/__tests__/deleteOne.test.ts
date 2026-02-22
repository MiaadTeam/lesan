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
import { deleteOne } from "../deleteOne.ts";
import { schemaMockData } from "../../../models/mainRelations/__test__/getMainRelations.test.ts";
import { ObjectId } from "../../../../npmDeps.ts";

test({
  name: "deleteOne should delete a simple document without relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const countryId = new ObjectId();
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    const result = await deleteOne({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      filter: { _id: countryId },
    });

    assertEquals(result, true);

    const deletedDoc = await db.collection("country").findOne({
      _id: countryId,
    });
    assertEquals(deletedDoc, null);
  },
});

test({
  name: "deleteOne should throw an error if document is not found",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentId = new ObjectId();

    await assertRejects(
      async () => {
        await deleteOne({
          db,
          schemasObj: schemaMockData,
          collection: "country",
          filter: { _id: nonExistentId },
        });
      },
      Error,
      "can not find this documents",
    );
  },
});

test({
  name:
    "deleteOne should remove the deleted document from its forward relations (single relation)",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const countryId = new ObjectId();
    const cityId = new ObjectId();

    // Insert country with the city embedded in its related relation array
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
      cities: [
        { _id: cityId, name: "Tehran", abb: 21, population: 15000000 },
      ],
    });

    // Insert city with the country embedded in its forward relation
    await db.collection("city").insertOne({
      _id: cityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: {
        _id: countryId,
        name: "Iran",
        abb: 98,
        population: 85000000,
      },
    });

    // Delete the city
    const result = await deleteOne({
      db,
      schemasObj: schemaMockData,
      collection: "city",
      filter: { _id: cityId },
    });

    assertEquals(result, true);

    // Verify the city was deleted
    const deletedCity = await db.collection("city").findOne({ _id: cityId });
    assertEquals(deletedCity, null);

    // Verify the country's cities array was updated (city removed)
    const updatedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedCountry);
    assertExists(updatedCountry!.cities);
    assertEquals(updatedCountry!.cities.length, 0);
  },
});

test({
  name:
    "deleteOne should remove the deleted document from its forward relations (multiple relations)",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const userId = new ObjectId();
    const cityId = new ObjectId();

    // Insert city with the user embedded in its related relation array
    await db.collection("city").insertOne({
      _id: cityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      users: [{ _id: userId, name: "Syd", age: 30, address: "Tehran" }],
    });

    // Insert user with the city embedded in its forward relation
    await db.collection("user").insertOne({
      _id: userId,
      name: "Syd",
      age: 30,
      address: "Tehran",
      livedCities: [
        { _id: cityId, name: "Tehran", abb: 21, population: 15000000 },
      ],
    });

    // Delete the user
    const result = await deleteOne({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      filter: { _id: userId },
    });

    assertEquals(result, true);

    // Verify the user was deleted
    const deletedUser = await db.collection("user").findOne({ _id: userId });
    assertEquals(deletedUser, null);

    // Verify the city's users array was updated (user removed)
    const updatedCity = await db.collection("city").findOne({ _id: cityId });
    assertExists(updatedCity);
    assertExists(updatedCity!.users);
    assertEquals(updatedCity!.users.length, 0);
  },
});

test({
  name:
    "deleteOne should throw an error if other documents depend on it via mainRelations (hardCascade: false)",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const countryId = new ObjectId();
    const cityId = new ObjectId();

    // Insert country
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    // Insert city with the country embedded (city has a mainRelation to country)
    await db.collection("city").insertOne({
      _id: cityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: {
        _id: countryId,
        name: "Iran",
        abb: 98,
        population: 85000000,
      },
    });

    // Try to delete the country without hardCascade
    await assertRejects(
      async () => {
        await deleteOne({
          db,
          schemasObj: schemaMockData,
          collection: "country",
          filter: { _id: countryId },
        });
      },
      Error,
      "please clear below relations status before deletion",
    );

    // Verify the country was NOT deleted
    const country = await db.collection("country").findOne({ _id: countryId });
    assertExists(country);
  },
});

test({
  name:
    "deleteOne should cascade delete dependent documents if hardCascade is true",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const countryId = new ObjectId();
    const cityId = new ObjectId();

    // Insert country
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    // Insert city with the country embedded (city has a mainRelation to country)
    await db.collection("city").insertOne({
      _id: cityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: {
        _id: countryId,
        name: "Iran",
        abb: 98,
        population: 85000000,
      },
    });

    // Delete the country with hardCascade: true
    const result = await deleteOne({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      filter: { _id: countryId },
      hardCascade: true,
    });

    assertEquals(result, true);

    // Verify the country was deleted
    const deletedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertEquals(deletedCountry, null);

    // Verify the dependent city was ALSO deleted
    const deletedCity = await db.collection("city").findOne({ _id: cityId });
    assertEquals(deletedCity, null);
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
