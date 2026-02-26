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
import { findOneAndUpdate } from "../findOneAndUpdate.ts";
import { schemaMockData } from "../../../models/mainRelations/__test__/getMainRelations.test.ts";
import { ObjectId, string } from "../../../../npmDeps.ts";
import { TSchemas } from "../../../models/mod.ts";

test({
  name: "findOneAndUpdate should update a simple document without relations",
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

    const result = await findOneAndUpdate({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      filter: { _id: countryId },
      update: { $set: { name: "Persia", population: 90000000 } },
      projection: { _id: 1, name: 1, abb: 1, population: 1 },
    });

    assertExists(result);
    assertEquals(result!.name, "Persia");
    assertEquals(result!.population, 90000000);

    const updatedDoc = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedDoc);
    assertEquals(updatedDoc!.name, "Persia");
    assertEquals(updatedDoc!.population, 90000000);
  },
});

test({
  name:
    "findOneAndUpdate should update a document and propagate changes to its forward relations (single relation)",
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

    // Update the city
    const result = await findOneAndUpdate({
      db,
      schemasObj: schemaMockData,
      collection: "city",
      filter: { _id: cityId },
      update: { $set: { name: "New Tehran", population: 16000000 } },
      projection: { _id: 1, name: 1, abb: 1, population: 1 },
    });

    assertExists(result);
    assertEquals(result!.name, "New Tehran");

    // Verify the city was updated
    const updatedCity = await db.collection("city").findOne({ _id: cityId });
    assertExists(updatedCity);
    assertEquals(updatedCity!.name, "New Tehran");
    assertEquals(updatedCity!.population, 16000000);

    // Verify the country's cities array was updated with the new city data
    const updatedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedCountry);
    assertExists(updatedCountry!.cities);
    assertEquals(updatedCountry!.cities.length, 1);
    assertEquals(updatedCountry!.cities[0].name, "New Tehran");
    assertEquals(updatedCountry!.cities[0].population, 16000000);
  },
});

test({
  name:
    "findOneAndUpdate should update a document and propagate changes to its reverse relations (documents that embed it)",
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
      cities: [
        { _id: cityId, name: "Tehran", abb: 21, population: 15000000 },
      ],
    });

    // Insert city with the country embedded
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

    // Update the country
    const result = await findOneAndUpdate({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      filter: { _id: countryId },
      update: { $set: { name: "Persia", population: 90000000 } },
      projection: { _id: 1, name: 1, abb: 1, population: 1 },
    });

    assertExists(result);
    assertEquals(result!.name, "Persia");

    // Verify the country was updated
    const updatedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedCountry);
    assertEquals(updatedCountry!.name, "Persia");
    assertEquals(updatedCountry!.population, 90000000);

    // Verify the city's embedded country object was updated
    const updatedCity = await db.collection("city").findOne({ _id: cityId });
    assertExists(updatedCity);
    assertExists(updatedCity!.country);
    assertEquals(updatedCity!.country.name, "Persia");
    assertEquals(updatedCity!.country.population, 90000000);
  },
});

test({
  name:
    "findOneAndUpdate should update a document and propagate changes to multiple relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const userId = new ObjectId();
    const city1Id = new ObjectId();
    const city2Id = new ObjectId();

    // Insert cities with the user embedded in their related relation array
    await db.collection("city").insertMany([
      {
        _id: city1Id,
        name: "Tehran",
        abb: 21,
        population: 15000000,
        users: [{ _id: userId, name: "Syd", age: 30, address: "Tehran" }],
      },
      {
        _id: city2Id,
        name: "Mashhad",
        abb: 51,
        population: 3000000,
        users: [{ _id: userId, name: "Syd", age: 30, address: "Tehran" }],
      },
    ]);

    // Insert user with the cities embedded in its forward relation
    await db.collection("user").insertOne({
      _id: userId,
      name: "Syd",
      age: 30,
      address: "Tehran",
      livedCities: [
        { _id: city1Id, name: "Tehran", abb: 21, population: 15000000 },
        { _id: city2Id, name: "Mashhad", abb: 51, population: 3000000 },
      ],
    });

    // Update the user
    const result = await findOneAndUpdate({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      filter: { _id: userId },
      update: { $set: { name: "Syd Updated", age: 31 } },
      projection: { _id: 1, name: 1, age: 1, address: 1 },
    });

    assertExists(result);
    assertEquals(result!.name, "Syd Updated");
    assertEquals(result!.age, 31);

    // Verify the cities' users arrays were updated with the new user data
    const updatedCity1 = await db.collection("city").findOne({ _id: city1Id });
    assertExists(updatedCity1);
    assertExists(updatedCity1!.users);
    assertEquals(updatedCity1!.users.length, 1);
    assertEquals(updatedCity1!.users[0].name, "Syd Updated");
    assertEquals(updatedCity1!.users[0].age, 31);

    const updatedCity2 = await db.collection("city").findOne({ _id: city2Id });
    assertExists(updatedCity2);
    assertExists(updatedCity2!.users);
    assertEquals(updatedCity2!.users.length, 1);
    assertEquals(updatedCity2!.users[0].name, "Syd Updated");
    assertEquals(updatedCity2!.users[0].age, 31);
  },
});

test({
  name: "findOneAndUpdate should respect excludes in related relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const customSchemas: TSchemas = {
      author: {
        pure: {
          _id: string(),
          name: string(),
          secretKey: string(),
        },
        relations: {
          books: {
            optional: false,
            schemaName: "book",
            type: "multiple",
            sort: { field: "_id", order: "desc" },
            relatedRelations: {
              authors: {
                type: "multiple",
                limit: 5,
                sort: { field: "_id", order: "desc" },
                excludes: ["secretKey"],
              },
            },
          },
        },
        mainRelations: {
          books: {
            schemaName: "book",
            type: "multiple",
            optional: false,
            sort: { field: "_id", order: "desc" },
          },
        },
        relatedRelations: {},
      },
      book: {
        pure: {
          _id: string(),
          title: string(),
        },
        relations: {},
        mainRelations: {},
        relatedRelations: {
          authors: {
            mainRelationName: "books",
            mainRelationType: "multiple",
            schemaName: "author",
            type: "multiple",
            limit: 5,
            sort: { field: "_id", order: "desc" },
          },
        },
      },
    };

    const authorId = new ObjectId();
    const bookId = new ObjectId();

    // Insert book with author embedded
    await db.collection("book").insertOne({
      _id: bookId,
      title: "The Great Book",
      authors: [
        { _id: authorId, name: "John Doe", secretKey: "old-secret" },
      ],
    });

    // Insert author with book embedded
    await db.collection("author").insertOne({
      _id: authorId,
      name: "John Doe",
      secretKey: "old-secret",
      books: [
        { _id: bookId, title: "The Great Book" },
      ],
    });

    // Update the author
    const result = await findOneAndUpdate({
      db,
      schemasObj: customSchemas,
      collection: "author",
      filter: { _id: authorId },
      update: { $set: { name: "John Smith", secretKey: "new-secret" } },
      projection: { _id: 1, name: 1, secretKey: 1 },
    });

    assertExists(result);
    assertEquals(result!.name, "John Smith");
    assertEquals(result!.secretKey, "new-secret");

    // Verify the book's authors array was updated but respects excludes
    const updatedBook = await db.collection("book").findOne({ _id: bookId });
    assertExists(updatedBook);
    assertExists(updatedBook!.authors);
    assertEquals(updatedBook!.authors.length, 1);
    assertEquals(updatedBook!.authors[0].name, "John Smith");
    assertEquals(updatedBook!.authors[0].secretKey, undefined); // Should be excluded
  },
});

test({
  name: "findOneAndUpdate should throw an error if document is not found",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentId = new ObjectId();

    await assertRejects(
      async () => {
        await findOneAndUpdate({
          db,
          schemasObj: schemaMockData,
          collection: "country",
          filter: { _id: nonExistentId },
          update: { $set: { name: "Nowhere" } },
          projection: { _id: 1, name: 1 },
        });
      },
      Error,
      "can not update this doc",
    );
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
