import { getAct } from "../mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";
import { mockActs, testGetUserAct } from "./actMockData.ts";

Deno.test({
  name: "getAct should return getUser from mockActs",
  fn() {
    const getOneAct = getAct(mockActs, "main", "user", "getUser");
    assertEquals(getOneAct, testGetUserAct);
  },
});

Deno.test({
  name: "getAct should throw error when we pass notServices",
  fn() {
    const getNotMethod = () => getAct(mockActs, "main", "user", "notMethod");
    assertThrows(getNotMethod, Error, "Invalid action name: notMethod");
  },
});

Deno.test({
  name: "getAct should throw error when we want notMethod from mockActs",
  fn() {
    const getNotMethod = () => getAct(mockActs, "main", "user", "notMethod");
    assertThrows(getNotMethod, Error, "Invalid action name: notMethod");
  },
});

Deno.test({
  name: "getAct should throw error when we pass notSchema",
  fn() {
    const getNotSchema = () => getAct(mockActs, "main", "notuser", "getUser");
    assertThrows(getNotSchema, Error, "Invalid schema: notuser");
  },
});

Deno.test({
  name: "getAct should throw error when we pass notService",
  fn() {
    const getNotSchema = () => getAct(mockActs, "notmain", "user", "getUser");

    assertThrows(
      getNotSchema,
      Error,
      "Invalid service: can not find notmain service"
    );
  },
});
