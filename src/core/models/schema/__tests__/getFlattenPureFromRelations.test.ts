import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertInstanceOf } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getFlattenPureFromRelations } from "../getFlattenPureFromRelations.ts";

test({
  name: "getFlattenPureFromRelations should return flatten pureSchemas from mainRelations when MainRelations is passed",
  fn() {
    const getOneFlattenPureFromRelations = getFlattenPureFromRelations(
      schemaMockData,
      "city",
      "MainRelations"
    );
    assertInstanceOf(getOneFlattenPureFromRelations, Object);
  },
});

test({
  name: "getFlattenPureFromRelations should return flatten pureSchemas from relatedRelations when RelatedRelations is passed",
  fn() {
    const getOneFlattenPureFromRelations = getFlattenPureFromRelations(
      schemaMockData,
      "city",
      "RelatedRelations"
    );
    assertInstanceOf(getOneFlattenPureFromRelations, Object);
  },
});

test({
  name: "getFlattenPureFromRelations should return flatten pureSchemas from both relatedRelations and mainRelations when All is passed",
  fn() {
    const getOneFlattenPureFromRelations = getFlattenPureFromRelations(
      schemaMockData,
      "city",
      "All"
    );
    assertInstanceOf(getOneFlattenPureFromRelations, Object);
  },
});
