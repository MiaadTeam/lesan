import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getRelatedRelations } from "../getRelatedRelations.ts";

test({
  name: "getSchemaRelatedRelations must be relatedRelations return according to schemaName",
  fn() {
    const getSchemaRelatedRelations = getRelatedRelations(
      schemaMockData,
      "country"
    );
    assertEquals(typeof getSchemaRelatedRelations, "object");
  },
});
