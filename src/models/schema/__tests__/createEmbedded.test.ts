import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { createEmbedded } from "../mod.ts";
import { assertInstanceOf } from "https://deno.land/std@0.210.0/assert/mod.ts";

Deno.test({
  name: "createEmbedded should return getPureFromMainRelations and getPureFromRelatedRelations from schemaMockData",
  fn() {
    assertInstanceOf(createEmbedded(schemaMockData, "city"), Object);
  },
});
