import { test } from "../../../../tests/utils/test-runner.ts";
import {
  assertInstanceOf,
  assertThrows,
} from "../../../../tests/utils/assert.ts";
import { getService } from "../mod.ts";
import { mockActs } from "./actMockData.ts";

test({
  name: "getService should return getUser from mockActs",
  fn() {
    const getOneService = getService(mockActs, "main");
    assertInstanceOf(getOneService, Object);
  },
});

test({
  name: "getService should throw error when we pass notServiceName",
  fn() {
    const getNotService = () => getService(mockActs, "notMain");
    assertThrows(getNotService, Error, "Invalid serviceName: notMain");
  },
});
