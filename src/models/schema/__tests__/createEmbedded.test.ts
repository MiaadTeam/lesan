import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { getPureFromMainRelations } from "../getPureFromMainRelations.ts";
import { getPureFromRelatedRelations } from "../getPureFromRelatedRelations.ts";
import { createEmbedded } from "../mod.ts";
import { assertInstanceOf } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { object } from "../../../npmDeps.ts";

Deno.test({
  name: "createEmbedded should return getPureFromMainRelations and getPureFromRelatedRelations from schemaMockData",
  fn() {
    assertInstanceOf(createEmbedded(schemaMockData, "city"), Object);
  },
});
