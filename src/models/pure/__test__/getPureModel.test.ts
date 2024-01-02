import {
  assertInstanceOf,
  assertThrows,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModel } from "../getPureModel.ts";

Deno.test({
  name: "getPureModel should return Pure of user from schemaMockData",
  fn() {
    const getSchemaPureModel = getPureModel(schemaMockData, "user");
    assertInstanceOf(getSchemaPureModel, Object);
  },
});

Deno.test({
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
