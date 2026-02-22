import { createStruct } from "../mod.ts";
import { schemaMockData } from "../../mainRelations/__test__/getMainRelations.test.ts";
import { assertInstanceOf } from "https://deno.land/std@0.210.0/assert/mod.ts";

Deno.test({
  name: "getPureSchema should return schema.pure from schemaMockData",
  fn() {
    assertInstanceOf(createStruct(schemaMockData, "city"), Object);
  },
});
