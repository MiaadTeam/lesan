import {
  assertInstanceOf,
  assertThrows,
} from "https://deno.land/std/assert/mod.ts";
import { mockActs } from "./getAct.test.ts";
import { getMainAct } from "../getMainAct.ts";

Deno.test({
  name: "getMainAct should return getUser from mockActs",
  fn() {
    const getOneMainAct = getMainAct(mockActs, "user", "getUser");
    assertInstanceOf(getOneMainAct, Object);
  },
});

Deno.test({
  name: "getMainAct should throw error when we pass notSchema",
  fn() {
    const getNotSchema = () => getMainAct(mockActs, "notUser", "getUser");
    assertThrows(getNotSchema, Error, "Invalid schema: notUser");
  },
});

Deno.test({
  name: "getMainAct should throw error when we pass notActName",
  fn() {
    const getNotSchema = () => getMainAct(mockActs, "user", "notGetUser");
    assertThrows(getNotSchema, Error, "Invalid actName: notGetUser");
  },
});
