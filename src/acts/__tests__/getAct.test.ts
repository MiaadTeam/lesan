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
};

Deno.test({
  name: "should return getUser from mockActs",
  fn() {
    const getOneAct = getAct(mockActs, "main", "user", "getUser");
    assertInstanceOf(getOneAct, Object);
  },
});

Deno.test({
  name: "should throw error when we want notMethod from mockActs",
  fn() {
    const getNotMethod = () => getAct(mockActs, "main", "user", "notMethod");
    assertThrows(getNotMethod, Error, "Invalid action name: notMethod");
  },
});
