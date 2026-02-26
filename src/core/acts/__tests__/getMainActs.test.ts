import { test } from "../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../tests/utils/assert.ts";
import { getMainActs } from "../getMainActs.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getMainActs should return main act from mockActs",
  fn() {
    assertEquals(getMainActs(mockActs), mockActs.main);
  },
});
