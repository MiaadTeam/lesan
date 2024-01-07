import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModel } from "../getPureModel.ts";

Deno.test({
  name: "getPureModel should return Pure of user from schemaMockData",
  fn() {
    const getSchemaPureModel = getPureModel(schemaMockData, "user");
    assertEquals(typeof getSchemaPureModel, "object");
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
