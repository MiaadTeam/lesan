import { assertInstanceOf } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { addPureModel } from "../addPureModel.ts";
import { string } from "../../../npmDeps.ts";

Deno.test({
  name: "addPureModel should add post PureModel",
  fn() {
    const addSchemaPureModel = addPureModel(schemaMockData, "post", {
      _id: string(),
      title: string(),
    });
    assertInstanceOf(addSchemaPureModel, Object);
  },
});
