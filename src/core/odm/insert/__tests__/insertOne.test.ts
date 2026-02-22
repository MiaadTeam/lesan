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
import { insertOne } from "../insertOne.ts";
import { schemaMockData } from "../../../models/mainRelations/__test__/getMainRelations.test.ts";
import { ObjectId, string } from "../../../../npmDeps.ts";
import { TSchemas } from "../../../models/mod.ts";

test({
  name: "insertOne should insert a document without relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const doc = {
      name: "Iran",
      abb: 98,
      population: 85000000,
    };

    const result = await insertOne({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      doc,
    });

    assertExists(result);
    assertExists(result!._id);

    const insertedDoc = await db.collection("country").findOne({
      _id: result!._id,
    });
    assertExists(insertedDoc);
    assertEquals(insertedDoc!.name, "Iran");
    assertEquals(insertedDoc!.abb, 98);
  },
});

test({
  name: "insertOne should insert a document with a single relation",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    // First, insert a country to relate to
    const countryId = new ObjectId();
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    const doc = {
      name: "Tehran",
      abb: 21,
      population: 15000000,
    };

    const result = await insertOne({
      db,
      schemasObj: schemaMockData,
      collection: "city",
      doc,
      relations: {
        country: {
          _ids: countryId,
          relatedRelations: {
            cities: true,
          },
        },
      },
    });

    assertExists(result);
    assertExists(result!._id);

    // Check if city was inserted with the relation
    const insertedCity = await db.collection("city").findOne({
      _id: result!._id,
    });
    assertExists(insertedCity);
    assertEquals(insertedCity!.name, "Tehran");
    assertExists(insertedCity!.country);
    assertEquals(insertedCity!.country._id.toString(), countryId.toString());
    assertEquals(insertedCity!.country.name, "Iran");

    // Check if the related relation (country -> cities) was updated
    const updatedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedCountry);
    assertExists(updatedCountry!.cities);
    assertEquals(updatedCountry!.cities.length, 1);
    assertEquals(
      updatedCountry!.cities[0]._id.toString(),
      result!._id.toString(),
    );
    assertEquals(updatedCountry!.cities[0].name, "Tehran");
  },
});

test({
  name: "insertOne should insert a document with multiple relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    // First, insert a country
    const countryId = new ObjectId();
    await db.collection("country").insertOne({
      _id: countryId,
      name: "Iran",
      abb: 98,
      population: 85000000,
    });

    // Insert two cities
    const city1Id = new ObjectId();
    await db.collection("city").insertOne({
      _id: city1Id,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: { _id: countryId, name: "Iran", abb: 98, population: 85000000 },
    });

    const city2Id = new ObjectId();
    await db.collection("city").insertOne({
      _id: city2Id,
      name: "Mashhad",
      abb: 51,
      population: 3000000,
      country: { _id: countryId, name: "Iran", abb: 98, population: 85000000 },
    });

    const doc = {
      name: "Syd",
      age: 30,
      address: "Tehran, Iran",
    };

    const result = await insertOne({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      doc,
      relations: {
        country: {
          _ids: countryId,
          relatedRelations: {
            users: true,
          },
        },
        livedCities: {
          _ids: [city1Id, city2Id],
          relatedRelations: {
            users: true,
          },
        },
      },
    });

    assertExists(result);
    assertExists(result!._id);

    // Check if user was inserted with the relations
    const insertedUser = await db.collection("user").findOne({
      _id: result!._id,
    });
    assertExists(insertedUser);
    assertEquals(insertedUser!.name, "Syd");

    // Check single relation
    assertExists(insertedUser!.country);
    assertEquals(insertedUser!.country._id.toString(), countryId.toString());

    // Check multiple relation
    assertExists(insertedUser!.livedCities);
    assertEquals(insertedUser!.livedCities.length, 2);
    const cityIds = insertedUser!.livedCities.map((c: any) => c._id.toString());
    assertEquals(cityIds.includes(city1Id.toString()), true);
    assertEquals(cityIds.includes(city2Id.toString()), true);

    // Check if the related relation (city -> users) was updated
    const updatedCity1 = await db.collection("city").findOne({
      _id: city1Id,
    });
    assertExists(updatedCity1);
    assertExists(updatedCity1!.users);
    assertEquals(updatedCity1!.users.length, 1);
    assertEquals(updatedCity1!.users[0]._id.toString(), result!._id.toString());
    assertEquals(updatedCity1!.users[0].name, "Syd");

    const updatedCity2 = await db.collection("city").findOne({
      _id: city2Id,
    });
    assertExists(updatedCity2);
    assertExists(updatedCity2!.users);
    assertEquals(updatedCity2!.users.length, 1);
    assertEquals(updatedCity2!.users[0]._id.toString(), result!._id.toString());
    assertEquals(updatedCity2!.users[0].name, "Syd");
  },
});

test({
  name: "insertOne should throw error if required relation is missing",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const doc = {
      name: "Tehran",
      abb: 21,
      population: 15000000,
    };

    // city requires a country relation (optional: false)
    await assertRejects(
      async () => {
        await insertOne({
          db,
          schemasObj: schemaMockData,
          collection: "city",
          doc,
        });
      },
      Error,
      "can not find this relatation : country",
    );
  },
});

test({
  name: "insertOne should throw error if related document does not exist",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentCountryId = new ObjectId();

    const doc = {
      name: "Tehran",
      abb: 21,
      population: 15000000,
    };

    await assertRejects(
      async () => {
        await insertOne({
          db,
          schemasObj: schemaMockData,
          collection: "city",
          doc,
          relations: {
            country: {
              _ids: nonExistentCountryId,
            },
          },
        });
      },
      Error,
      "can not find this relation : country",
    );
  },
});

test({
  name:
    "insertOne should throw error if some multiple relation documents do not exist",
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

    const existingCityId = new ObjectId();
    await db.collection("city").insertOne({
      _id: existingCityId,
      name: "Tehran",
      abb: 21,
      population: 15000000,
      country: { _id: countryId, name: "Iran", abb: 98, population: 85000000 },
    });

    const nonExistentCityId = new ObjectId();

    const doc = {
      name: "Syd",
      age: 30,
      address: "Tehran, Iran",
    };

    await assertRejects(
      async () => {
        await insertOne({
          db,
          schemasObj: schemaMockData,
          collection: "user",
          doc,
          relations: {
            country: {
              _ids: countryId,
            },
            livedCities: {
              _ids: [existingCityId, nonExistentCityId],
            },
          },
        });
      },
      Error,
      "we have problem with this relatation : livedCities",
    );
  },
});

test({
  name: "insertOne should respect excludes in related relations",
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

    const bookId = new ObjectId();
    await db.collection("book").insertOne({
      _id: bookId,
      title: "The Great Book",
    });

    const doc = {
      name: "John Doe",
      secretKey: "super-secret-123",
    };

    const result = await insertOne({
      db,
      schemasObj: customSchemas,
      collection: "author",
      doc,
      relations: {
        books: {
          _ids: [bookId],
          relatedRelations: {
            authors: true,
          },
        },
      },
    });

    assertExists(result);
    assertExists(result!._id);

    // Check if author was inserted
    const insertedAuthor = await db.collection("author").findOne({
      _id: result!._id,
    });
    assertExists(insertedAuthor);
    assertEquals(insertedAuthor!.name, "John Doe");
    assertEquals(insertedAuthor!.secretKey, "super-secret-123");

    // Check if the related relation (book -> authors) was updated and respects excludes
    const updatedBook = await db.collection("book").findOne({
      _id: bookId,
    });
    assertExists(updatedBook);
    assertExists(updatedBook!.authors);
    assertEquals(updatedBook!.authors.length, 1);
    assertEquals(
      updatedBook!.authors[0]._id.toString(),
      result!._id.toString(),
    );
    assertEquals(updatedBook!.authors[0].name, "John Doe");
    assertEquals(updatedBook!.authors[0].secretKey, undefined); // Should be excluded
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
