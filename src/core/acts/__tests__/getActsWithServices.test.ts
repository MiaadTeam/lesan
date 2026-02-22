import { test } from "../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../tests/utils/assert.ts";
import { getAtcsWithServices } from "../getActsWithServices.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getActsWithServices should return acts from mockActs",
  fn() {
    assertEquals(getAtcsWithServices(mockActs), mockActs);
  },
});
