import { assertInstanceOf } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureFromRelatedRelations } from "../mod.ts";

Deno.test({
  name: "getPureFromRelatedRelations should return pureSchemas from relatedRelations",
  fn() {
    const getOnePureFromRelatedRelations = getPureFromRelatedRelations(
      schemaMockData,
      "city"
    );
    assertInstanceOf(getOnePureFromRelatedRelations, Object);
  },
});
