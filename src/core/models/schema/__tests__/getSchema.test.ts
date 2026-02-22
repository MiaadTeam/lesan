import { test } from "../../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchema } from "../getSchema.ts";

test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchema(schemaMockData, "country"), schemaMockData.country);
  },
});

test({
  name: "getSchema should throw err when schema does not exist",
  fn() {
    const getNotSchema = () => getSchema(schemaMockData, "notCountry");
    assertThrows(getNotSchema, Error, "Schema notCountry not found");
  },
});
