import { test } from "../../../../tests/utils/test-runner.ts";
import { assertEquals } from "../../../../tests/utils/assert.ts";
import { getServiceKeys } from "../getServiceKeys.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getMainActs should return the keys from mockActs",
  fn() {
    assertEquals(getServiceKeys(mockActs), Object.keys(mockActs));
  },
});
