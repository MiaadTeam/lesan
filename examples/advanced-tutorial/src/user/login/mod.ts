import { coreApp } from "../../../mod.ts";
import { loginUserFn } from "./loginUser.fn.ts";
import { loginUserValidator } from "./loginUser.val.ts";

export const loginUserSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "login",
    fn: loginUserFn,
    validator: loginUserValidator(),
  });
