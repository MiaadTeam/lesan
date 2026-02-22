import { test } from "../../../../tests/utils/test-runner.ts";
import {
  assertEquals,
  assertThrows,
} from "../../../../tests/utils/assert.ts";
import { getActKeys } from "../mod.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getActKeys with serviceName='main' should return keys object",
  fn() {
    const getMainKeys = getActKeys(mockActs, "main");
    assertEquals(getMainKeys, ["user"]);
  },
});

test({
  name: "getActKeys should return keys object",
  fn() {
    const getStoreHouseKeys = getActKeys(mockActs, "storeHouse");
    assertEquals(getStoreHouseKeys, ["ware"]);
  },
});

test({
  name: "getActKeys should return keys object",
  fn() {
    const getEcommerceKey = () => getActKeys(mockActs, "ecommerce");
    assertThrows(getEcommerceKey, Error, "serviceName not valid : ecommerce");
  },
});

test({
  name: "getActKeys should throw error when we pass notServiceName",
  fn() {
    const getOneKey = () => getActKeys(mockActs, "notMain");
    assertThrows(getOneKey, Error, "serviceName not valid : notMain");
  },
});
