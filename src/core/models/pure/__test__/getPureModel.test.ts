import { test } from "../../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModel } from "../getPureModel.ts";

test({
  name: "getPureModel should return Pure of user from schemaMockData",
  fn() {
    const getSchemaPureModel = getPureModel(schemaMockData, "user");
    assertEquals(typeof getSchemaPureModel, "object");
  },
});

test({
  name: "getMainRelations should throw err when we want access to notUser",
  fn() {
    const getNotSchemaPureModel = () => getPureModel(schemaMockData, "notUser");
    assertThrows(
      getNotSchemaPureModel,
      Error,
      "Schema notUser is not exist in the Schema Object"
    );
  },
});
