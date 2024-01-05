import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureSchema } from "../getPureSchema.ts";
import { assertThrows } from "https://deno.land/std@0.210.0/assert/assert_throws.ts";

Deno.test({
  name: "getPureSchema should return schema.pure from schemaMockData",
  fn() {
    assertEquals(
      getPureSchema(schemaMockData, "city"),
      schemaMockData.city.pure
    );
  },
});

Deno.test({
  name: "getPureSchema should throw err when schema does not exist",
  fn() {
    const getNotSchema = () => getPureSchema(schemaMockData, "notCountry");
    assertThrows(getNotSchema, Error, "Schema notCountry not found");
  },
});
