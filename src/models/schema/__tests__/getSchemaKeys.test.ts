import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchemasKeys } from "../getSchemaKeys.ts";

Deno.test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemasKeys(schemaMockData), Object.keys(schemaMockData));
  },
});
