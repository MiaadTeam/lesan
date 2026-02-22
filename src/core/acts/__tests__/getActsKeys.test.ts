import { test } from "../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../tests/utils/assert.ts";
import { getActsKeys } from "../getActsKeys.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getActsKeys should return the keys of acts",
  fn() {
    const getKeysOfActs = getActsKeys(mockActs, "main", "user");
    assertEquals(getKeysOfActs, ["getUser"]);
  },
});

test({
  name: "getActsKeys should throw error when we pass notSchema",
  fn() {
    const getNotSchema = () => getActsKeys(mockActs, "main", "notUser");
    assertThrows(getNotSchema, Error, "Invalid schema: notUser");
  },
});

test({
  name: "getActsKeys should throw error when we pass notService",
  fn() {
    const getNotSchema = () => getActsKeys(mockActs, "notMain", "user");
    assertThrows(getNotSchema, Error, "Invalid service name: notMain");
  },
});
