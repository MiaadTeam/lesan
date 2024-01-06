import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { getServiceKeys } from "../getServiceKeys.ts";
import { mockActs } from "./actMockData.ts";

Deno.test({
  name: "getMainActs should return the keys from mockActs",
  fn() {
    assertEquals(getServiceKeys(mockActs), Object.keys(mockActs));
  },
});
