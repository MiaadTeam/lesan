import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.211.0/assert/mod.ts";
import { getActsKeys } from "../getActsKeys.ts";
import { mockActs } from "./actMockData.ts";

Deno.test({
  name: "getActsKeys should return the keys of acts",
  fn() {
    const getKeysOfActs = getActsKeys(mockActs, "main", "user");
    assertEquals(getKeysOfActs, ["getUser"]);
  },
});

Deno.test({
  name: "getActsKeys should throw error when we pass notSchema",
  fn() {
    const getNotSchema = () => getActsKeys(mockActs, "main", "notUser");
    assertThrows(getNotSchema, Error, "Invalid schema: notUser");
  },
});

Deno.test({
  name: "getActsKeys should throw error when we pass notService",
  fn() {
    const getNotSchema = () => getActsKeys(mockActs, "notMain", "user");
    assertThrows(getNotSchema, Error, "Invalid service name: notMain");
  },
});
