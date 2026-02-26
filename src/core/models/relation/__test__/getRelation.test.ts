import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getRelation } from "../getRelation.ts";

test({
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
