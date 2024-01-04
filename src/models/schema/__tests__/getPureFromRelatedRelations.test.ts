import { assertInstanceOf } from "https://deno.land/std@0.210.0/assert/assert_instance_of.ts";
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
