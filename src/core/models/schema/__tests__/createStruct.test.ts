import { test } from "../../../../../tests/utils/test-runner.ts";
import { createStruct } from "../mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { assertInstanceOf } from "../../../../../tests/utils/assert.ts";

test({
  name: "getPureSchema should return schema.pure from schemaMockData",
  fn() {
    assertInstanceOf(createStruct(schemaMockData, "city"), Object);
  },
});
