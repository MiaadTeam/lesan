import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getRelation } from "../getRelation.ts";

Deno.test({
  name: "getSchemaRelations should be according to schemaName and relationType getRelations returns",
  fn() {
    const getSchemaRelations = getRelation(
      schemaMockData,
      "city",
      "relatedRelations"
    );
    assertEquals(typeof getSchemaRelations, "object");
  },
});
