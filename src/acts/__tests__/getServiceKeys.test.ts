import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { getServiceKeys } from "../getServiceKeys.ts";
import { mockActs } from "./getAct.test.ts";

Deno.test({
  name: "getMainActs should return the keys from mockActs",
  fn() {
    assertEquals(getServiceKeys(mockActs), Object.keys(mockActs));
  },
});
