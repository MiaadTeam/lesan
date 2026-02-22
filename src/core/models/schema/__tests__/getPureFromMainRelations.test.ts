import { assertInstanceOf } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureFromMainRelations } from "../getPureFromMainRelations.ts";

Deno.test({
  name: "getPureFromRelatedRelations should return pureSchemas from relatedRelations",
  fn() {
    const getOnePureFromMainRelations = getPureFromMainRelations(
      schemaMockData,
      "city"
    );
    assertInstanceOf(getOnePureFromMainRelations, Object);
  },
});
