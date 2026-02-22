import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getSchemasKeys } from "../getSchemaKeys.ts";

test({
  name: "getSchema should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemasKeys(schemaMockData), Object.keys(schemaMockData));
  },
});
