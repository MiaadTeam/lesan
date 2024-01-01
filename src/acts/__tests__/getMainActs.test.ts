import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { getMainActs } from "../getMainActs.ts";
import { mockActs } from "./getAct.test.ts";

Deno.test({
  name: "getMainActs should return main act from mockActs",
  fn() {
    assertEquals(getMainActs(mockActs), mockActs.main);
  },
});
