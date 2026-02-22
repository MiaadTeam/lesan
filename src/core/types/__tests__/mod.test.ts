import { test } from "../../../../tests/utils/test-runner.ts";
import { assertEquals, assertExists } from "../../../../tests/utils/assert.ts";
import { generateSchemTypes } from "../mod.ts";
import { fs } from "../../../platform/adapters/index.ts";
import { number, object, string } from "../../../npmDeps.ts";
import { TSchemas } from "../../models/mod.ts";
import { Services } from "../../../mod.ts";

const mockSchemas: TSchemas = {
  user: {
    pure: {
      _id: string(),
      name: string(),
      age: number(),
    },
    relations: {},
    mainRelations: {
      country: {
        schemaName: "country",
        type: "single",
        optional: false,
      },
    },
    relatedRelations: {
      posts: {
        schemaName: "post",
        type: "multiple",
        mainRelationName: "user",
        mainRelationType: "single",
        limit: 10,
        sort: { field: "_id", order: "desc" },
      },
    },
  },
  country: {
    pure: { _id: string(), name: string() },
    relations: {},
    mainRelations: {},
    relatedRelations: {},
  },
  post: {
    pure: { _id: string(), title: string() },
    relations: {},
    mainRelations: {},
    relatedRelations: {},
  },
};

const mockActs: Services = {
  main: {},
  core: {
    user: {
      getUser: {
        validator: object({
          set: object({ id: string() }),
          get: object({ name: number() }),
        }),
        fn: async () => ({}),
      },
    },
  },
};

test({
  name:
    "generateSchemTypes should generate types and write to declarations/selectInp.ts",
  async fn() {
    await generateSchemTypes(mockSchemas, mockActs);

    const fileContent = await fs.readTextFile("./declarations/selectInp.ts");

    assertExists(fileContent);

    // Check for generated Inp types
    assertEquals(fileContent.includes("export type userInp = {"), true);
    assertEquals(fileContent.includes("country?: number | countryInp"), true);
    assertEquals(fileContent.includes("posts?: number | postInp"), true);

    // Check for generated Schema types
    assertEquals(fileContent.includes("export type userSchema = {"), true);
    assertEquals(fileContent.includes("name: string;"), true);
    assertEquals(fileContent.includes("age: number;"), true);

    // Check for generated ReqType
    assertEquals(fileContent.includes("export type ReqType = {"), true);
    assertEquals(fileContent.includes("core: {"), true);
    assertEquals(fileContent.includes("user: {"), true);
    assertEquals(fileContent.includes("getUser: {"), true);

    // Check for lesanApi client
    assertEquals(fileContent.includes("export const lesanApi = ("), true);
  },
});

test({
  name: "cleanup declarations directory",
  async fn() {
    try {
      if (fs.remove) {
        await fs.remove("./declarations");
      }
    } catch (e) {
      // Ignore if it doesn't exist or if remove is not implemented
    }
  },
});
