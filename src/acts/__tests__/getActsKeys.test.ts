import { assertThrows } from "https://deno.land/std/assert/mod.ts";
import { getActsKeys } from "../getActsKeys.ts";
import { mockActs } from "./getAct.test.ts";
import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";

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
