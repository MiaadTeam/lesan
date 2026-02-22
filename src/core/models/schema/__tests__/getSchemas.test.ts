import { getSchemas } from "../getSchemas.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";

Deno.test({
  name: "getSchemas should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemas(schemaMockData), schemaMockData);
  },
});
