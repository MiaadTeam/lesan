import { test } from "../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../tests/utils/assert.ts";
import { getAct } from "../mod.ts";

import { mockActs, testGetUserAct } from "./actMockData.ts";

test({
  name: "getAct should return getUser from mockActs",
  fn() {
    const getOneAct = getAct(mockActs, "main", "user", "getUser");
    assertEquals(getOneAct, testGetUserAct);
  },
});

test({
  name: "getAct should throw error when we pass notServices",
  fn() {
    const getNotMethod = () => getAct(mockActs, "main", "user", "notMethod");
    assertThrows(getNotMethod, Error, "Invalid action name: notMethod");
  },
});

test({
  name: "getAct should throw error when we want notMethod from mockActs",
  fn() {
    const getNotMethod = () => getAct(mockActs, "main", "user", "notMethod");
    assertThrows(getNotMethod, Error, "Invalid action name: notMethod");
  },
});

test({
  name: "getAct should throw error when we pass notSchema",
  fn() {
    const getNotSchema = () => getAct(mockActs, "main", "notuser", "getUser");
    assertThrows(getNotSchema, Error, "Invalid schema: notuser");
  },
});

test({
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
