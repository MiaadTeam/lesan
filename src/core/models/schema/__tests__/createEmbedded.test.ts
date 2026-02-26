import { test } from "../../../../../tests/utils/test-runner.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { createEmbedded } from "../mod.ts";
import { assertInstanceOf } from "../../../../../tests/utils/assert.ts";

test({
  name: "createEmbedded should return getPureFromMainRelations and getPureFromRelatedRelations from schemaMockData",
  fn() {
    assertInstanceOf(createEmbedded(schemaMockData, "city"), Object);
  },
});
