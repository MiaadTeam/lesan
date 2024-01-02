import { assertInstanceOf } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getRelatedRelations } from "../getRelatedRelations.ts";

Deno.test({
  name: "getSchemaRelatedRelations must be relatedRelations return according to schemaName",
  fn() {
    const getSchemaRelatedRelations = getRelatedRelations(
      schemaMockData,
      "country"
    );
    assertInstanceOf(getSchemaRelatedRelations, Object);
  },
});
