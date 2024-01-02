import { assertInstanceOf } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModelByNameAndKey } from "../getPureModelByNameAndKey.ts";

Deno.test({
  name: "getPureModelByNameAndKey Should Return Pure With Name And Name",
  fn() {
    const getSchemaPureModelByName = getPureModelByNameAndKey(
      schemaMockData,
      "user",
      "name"
    );
    assertInstanceOf(getSchemaPureModelByName, Object);
  },
});
