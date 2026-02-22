import { test } from "../../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureSchema } from "../getPureSchema.ts";

test({
  name: "getPureSchema should return schema.pure from schemaMockData",
  fn() {
    assertEquals(
      getPureSchema(schemaMockData, "city"),
      schemaMockData.city.pure
    );
  },
});

test({
  name: "getPureSchema should throw err when schema does not exist",
  fn() {
    const getNotSchema = () => getPureSchema(schemaMockData, "notCountry");
    assertThrows(getNotSchema, Error, "Schema notCountry not found");
  },
});
