import { test } from "../../../../../tests/utils/test-runner.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { addPureModel } from "../addPureModel.ts";
import { string } from "../../../../npmDeps.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";

test({
  name: "addPureModel should add post PureModel",
  fn() {
    const addSchemaPureModel = addPureModel(schemaMockData, "post", {
      _id: string(),
      title: string(),
    });
    assertEquals(typeof addSchemaPureModel, "object");
  },
});
