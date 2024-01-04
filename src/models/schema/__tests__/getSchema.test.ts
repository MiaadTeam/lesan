import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchema } from "../getSchema.ts";
import { assertThrows } from "https://deno.land/std@0.210.0/assert/assert_throws.ts";

Deno.test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchema(schemaMockData, "country"), schemaMockData.country);
  },
});

Deno.test({
  name: "getSchema should throw err when schema does not exist",
  fn() {
    const getNotSchema = () => getSchema(schemaMockData, "notCountry");
    assertThrows(getNotSchema, Error, "Schema notCountry not found");
  },
});
