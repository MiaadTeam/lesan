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
import { insertMany } from "../insertMany.ts";
import { schemaMockData } from "../../../models/mainRelations/__test__/getMainRelations.test.ts";
import { ObjectId } from "../../../../npmDeps.ts";

import { string } from "../../../../npmDeps.ts";
import { TSchemas } from "../../../models/mod.ts";

test({
  name: "insertMany should insert multiple documents without relations",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const docs = [
      { name: "Iran", abb: 98, population: 85000000 },
      { name: "Germany", abb: 49, population: 83000000 },
    ];

    const result = await insertMany({
      db,
      schemasObj: schemaMockData,
      collection: "country",
      docs,
    });

    assertExists(result);
    assertEquals(result.length, 2);
    assertExists(result[0]._id);
    assertExists(result[1]._id);

    const insertedDocs = await db.collection("country").find({}).toArray();
    assertEquals(insertedDocs.length, 2);

    const names = insertedDocs.map((d) => d.name);
    assertEquals(names.includes("Iran"), true);
    assertEquals(names.includes("Germany"), true);
  },
});

test({
  name: "insertMany should insert multiple documents with a single relation",
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

    const docs = [
      { name: "Tehran", abb: 21, population: 15000000 },
      { name: "Mashhad", abb: 51, population: 3000000 },
    ];

    const result = await insertMany({
      db,
      schemasObj: schemaMockData,
      collection: "city",
      docs,
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
    assertEquals(result.length, 2);

    // Check if cities were inserted with the relation
    const insertedCities = await db.collection("city").find({}).toArray();
    assertEquals(insertedCities.length, 2);

    for (const city of insertedCities) {
      assertExists(city.country);
      assertEquals(city.country._id.toString(), countryId.toString());
      assertEquals(city.country.name, "Iran");
    }

    // Check if the related relation (country -> cities) was updated with BOTH cities
    const updatedCountry = await db.collection("country").findOne({
      _id: countryId,
    });
    assertExists(updatedCountry);
    assertExists(updatedCountry!.cities);
    assertEquals(updatedCountry!.cities.length, 2);

    const cityIdsInCountry = updatedCountry!.cities.map((c: any) =>
      c._id.toString()
    );
    assertEquals(cityIdsInCountry.includes(result[0]._id.toString()), true);
    assertEquals(cityIdsInCountry.includes(result[1]._id.toString()), true);
  },
});

test({
  name: "insertMany should insert multiple documents with multiple relations",
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

    const docs = [
      { name: "Syd", age: 30, address: "Tehran, Iran" },
      { name: "Ali", age: 25, address: "Mashhad, Iran" },
    ];

    const result = await insertMany({
      db,
      schemasObj: schemaMockData,
      collection: "user",
      docs,
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
    assertEquals(result.length, 2);

    // Check if users were inserted with the relations
    const insertedUsers = await db.collection("user").find({}).toArray();
    assertEquals(insertedUsers.length, 2);

    for (const user of insertedUsers) {
      // Check single relation
      assertExists(user.country);
      assertEquals(user.country._id.toString(), countryId.toString());

      // Check multiple relation
      assertExists(user.livedCities);
      assertEquals(user.livedCities.length, 2);
      const cityIds = user.livedCities.map((c: any) => c._id.toString());
      assertEquals(cityIds.includes(city1Id.toString()), true);
      assertEquals(cityIds.includes(city2Id.toString()), true);
    }

    // Check if the related relation (city -> users) was updated with BOTH users
    const updatedCity1 = await db.collection("city").findOne({ _id: city1Id });
    assertExists(updatedCity1);
    assertExists(updatedCity1!.users);
    assertEquals(updatedCity1!.users.length, 2);

    const userIdsInCity1 = updatedCity1!.users.map((u: any) =>
      u._id.toString()
    );
    assertEquals(userIdsInCity1.includes(result[0]._id.toString()), true);
    assertEquals(userIdsInCity1.includes(result[1]._id.toString()), true);
  },
});

test({
  name: "insertMany should throw error if required relation is missing",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const docs = [
      { name: "Tehran", abb: 21, population: 15000000 },
      { name: "Mashhad", abb: 51, population: 3000000 },
    ];

    // city requires a country relation (optional: false)
    await assertRejects(
      async () => {
        await insertMany({
          db,
          schemasObj: schemaMockData,
          collection: "city",
          docs,
        });
      },
      Error,
      "can not find this relatation : country",
    );
  },
});

test({
  name: "insertMany should throw error if related document does not exist",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const nonExistentCountryId = new ObjectId();

    const docs = [
      { name: "Tehran", abb: 21, population: 15000000 },
      { name: "Mashhad", abb: 51, population: 3000000 },
    ];

    await assertRejects(
      async () => {
        await insertMany({
          db,
          schemasObj: schemaMockData,
          collection: "city",
          docs,
          relations: {
            country: {
              _ids: nonExistentCountryId,
            },
          },
        });
      },
      Error,
      "can not find this relatation : country",
    );
  },
});

test({
  name: "insertMany should insert multiple documents with an optional relation",
  async fn() {
    const db = await startTestDb();
    await clearTestDb();

    const customSchemas: TSchemas = {
      post: {
        pure: {
          _id: string(),
          title: string(),
        },
        relations: {
          category: {
            optional: true,
            schemaName: "category",
            type: "single",
            relatedRelations: {
              posts: {
                type: "multiple",
                limit: 5,
                sort: { field: "_id", order: "desc" },
              },
            },
          },
        },
        mainRelations: {
          category: {
            schemaName: "category",
            type: "single",
            optional: true,
          },
        },
        relatedRelations: {},
      },
      category: {
        pure: {
          _id: string(),
          name: string(),
        },
        relations: {},
        mainRelations: {},
        relatedRelations: {
          posts: {
            mainRelationName: "category",
            mainRelationType: "single",
            schemaName: "post",
            type: "multiple",
            limit: 5,
            sort: { field: "_id", order: "desc" },
          },
        },
      },
    };

    const categoryId = new ObjectId();
    await db.collection("category").insertOne({
      _id: categoryId,
      name: "Tech",
    });

    const docs = [
      { title: "Post 1" },
      { title: "Post 2" },
    ];

    const result = await insertMany({
      db,
      schemasObj: customSchemas,
      collection: "post",
      docs,
      relations: {
        category: {
          _ids: categoryId,
          relatedRelations: {
            posts: true,
          },
        },
      },
    });

    assertExists(result);
    assertEquals(result.length, 2);

    const insertedPosts = await db.collection("post").find({}).toArray();
    assertEquals(insertedPosts.length, 2);

    for (const post of insertedPosts) {
      assertExists(post.category);
      assertEquals(post.category._id.toString(), categoryId.toString());
      assertEquals(post.category.name, "Tech");
    }

    const updatedCategory = await db.collection("category").findOne({
      _id: categoryId,
    });
    assertExists(updatedCategory);
    assertExists(updatedCategory!.posts);
    assertEquals(updatedCategory!.posts.length, 2);
  },
});

test({
  name: "cleanup db",
  async fn() {
    await stopTestDb();
  },
});
