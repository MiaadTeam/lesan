import { test } from "../../../../../tests/utils/test-runner.ts";
import { getSchemas } from "../getSchemas.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";

test({
  name: "getSchemas should return schemaMockData from schemaMockData",
  fn() {
    assertEquals(getSchemas(schemaMockData), schemaMockData);
  },
});
