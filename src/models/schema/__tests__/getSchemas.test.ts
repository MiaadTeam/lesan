import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { getSchemas } from "../getSchemas.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";

Deno.test({
  name: "getSchemas should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemas(schemaMockData), schemaMockData);
  },
});
