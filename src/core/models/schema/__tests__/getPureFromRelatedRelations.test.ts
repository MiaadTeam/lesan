import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertInstanceOf } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureFromRelatedRelations } from "../mod.ts";

test({
  name: "getPureFromRelatedRelations should return pureSchemas from relatedRelations",
  fn() {
    const getOnePureFromRelatedRelations = getPureFromRelatedRelations(
      schemaMockData,
      "city"
    );
    assertInstanceOf(getOnePureFromRelatedRelations, Object);
  },
});
