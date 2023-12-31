import {
  assertInstanceOf,
  assertThrows,
} from "https://deno.land/std/assert/mod.ts";
import { getAct, Services } from "../mod.ts";
import { object, string } from "../../npmDeps.ts";

export const mockActs: Services = {
  main: {
    user: {
      getUser: {
        validator: object({ name: string() }),
        fn: () => ({ name: "amir" }),
      },
    },
  },
  ecommerce: "http://localhost:8080/lesan",
  storeHouse: {
    ware: {
      getWares: {
        validator: object({ name: string() }),
        fn: () => ({ name: "wareName" }),
      },
    },
  },
};

Deno.test({
  name: "getAct should return getUser from mockActs",
  fn() {
    const getOneAct = getAct(mockActs, "main", "user", "getUser");
    assertInstanceOf(getOneAct, Object);
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
    console.log(getNotSchema);

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
