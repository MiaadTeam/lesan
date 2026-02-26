import { test } from "../../../../tests/utils/test-runner.ts";
import { Services } from "../mod.ts";
import { object, string } from "../../../npmDeps.ts";
import { setAct } from "../mod.ts";
import { mockActs } from "./actMockData.ts";
import { assertExists } from "../../../../tests/utils/assert.ts";

export const mockActsWithoutSchema: Services = {
  main: {},
};

test({
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

test({
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
