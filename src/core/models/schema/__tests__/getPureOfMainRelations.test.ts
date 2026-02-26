import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertInstanceOf } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureOfMainRelations } from "../mod.ts";

test({
  name: "getPureOfMainRelations should return pureSchemas and pureInrel",
  fn() {
    const getOnePureOfMainRelations = getPureOfMainRelations(
      schemaMockData,
      "city"
    );
    assertInstanceOf(getOnePureOfMainRelations, Object);
  },
});
