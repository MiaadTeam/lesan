import { assertThrows } from "https://deno.land/std/assert/mod.ts";
import { getActKeys } from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { mockActs } from "./getAct.test.ts";

Deno.test({
  name: "getActKeys with serviceName='main' should return keys object",
  fn() {
    const getMainKeys = getActKeys(mockActs, "main");
    assertEquals(getMainKeys, ["user"]);
  },
});

Deno.test({
  name: "getActKeys should return keys object",
  fn() {
    const getStoreHouseKeys = getActKeys(mockActs, "storeHouse");
    assertEquals(getStoreHouseKeys, ["ware"]);
  },
});

Deno.test({
  name: "getActKeys should return keys object",
  fn() {
    const getEcommerceKey = () => getActKeys(mockActs, "ecommerce");
    assertThrows(getEcommerceKey, Error, "serviceName not valid : ecommerce");
  },
});

Deno.test({
  name: "getActKeys should throw error when we pass notServiceName",
  fn() {
    const getOneKey = () => getActKeys(mockActs, "notMain");
    assertThrows(getOneKey, Error, "serviceName not valid : notMain");
  },
});
