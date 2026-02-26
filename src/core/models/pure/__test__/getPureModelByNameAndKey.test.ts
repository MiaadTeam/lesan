import { test } from "../../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../../tests/utils/assert.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureModelByNameAndKey } from "../getPureModelByNameAndKey.ts";

test({
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
