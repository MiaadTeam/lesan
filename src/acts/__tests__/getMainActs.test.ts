import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { getMainActs } from "../getMainActs.ts";
import { mockActs } from "./actMockData.ts";

Deno.test({
  name: "getMainActs should return main act from mockActs",
  fn() {
    assertEquals(getMainActs(mockActs), mockActs.main);
  },
});
