import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchemasKeys } from "../getSchemaKeys.ts";

Deno.test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemasKeys(schemaMockData), Object.keys(schemaMockData));
  },
});
