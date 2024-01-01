import { getAtcsWithServices } from "../getActsWithServices.ts";
import { mockActs } from "./getAct.test.ts";
import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";

Deno.test({
  name: "getActsWithServices should return acts from mockActs",
  fn() {
    assertEquals(getAtcsWithServices(mockActs), mockActs);
  },
});
