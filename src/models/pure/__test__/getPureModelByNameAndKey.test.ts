import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModelByNameAndKey } from "../getPureModelByNameAndKey.ts";

Deno.test({
  name: "getPureModelByNameAndKey Should Return Pure With Name And key",
  fn() {
    const getSchemaPureModelByName = getPureModelByNameAndKey(
      schemaMockData,
      "user",
      "name"
    );
    assertEquals(typeof getSchemaPureModelByName, "object");
  },
});
