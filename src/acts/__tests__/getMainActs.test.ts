import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { getMainActs } from "../getMainActs.ts";
import { mockActs } from "./actMockData.ts";

Deno.test({
  name: "getMainActs should return main act from mockActs",
  fn() {
    assertEquals(getMainActs(mockActs), mockActs.main);
  },
});
