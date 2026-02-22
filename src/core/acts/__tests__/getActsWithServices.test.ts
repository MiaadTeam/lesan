import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";
import { getAtcsWithServices } from "../getActsWithServices.ts";
import { mockActs } from "./actMockData.ts";

Deno.test({
  name: "getActsWithServices should return acts from mockActs",
  fn() {
    assertEquals(getAtcsWithServices(mockActs), mockActs);
  },
});
