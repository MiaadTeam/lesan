import { Services } from "../mod.ts";
import { object, string } from "../../../npmDeps.ts";
import { setAct } from "../mod.ts";
import { mockActs } from "./actMockData.ts";
import { assertExists } from "https://deno.land/std@0.211.0/assert/mod.ts";

export const mockActsWithoutSchema: Services = {
  main: {},
};

Deno.test({
  name: "setAct should work with mockActs",
  fn() {
    setAct(mockActs, {
      schema: "user",
      actName: "createUser",
      validator: object({ name: string() }),
      fn: () => ({ user: "amir" }),
    });
    assertExists(mockActs.main.user.createUser);
  },
});

Deno.test({
  name: "setAct should work with mockActsWithoutSchema",
  fn() {
    setAct(mockActsWithoutSchema, {
      schema: "user",
      actName: "createUser",
      validator: object({ name: string() }),
      fn: () => ({ user: "amir" }),
    });
    assertExists(mockActs.main.user.createUser);
  },
});
