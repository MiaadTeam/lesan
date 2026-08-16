import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { activateProcessFn } from "./activateProcess.fn.ts";
import { activateProcessValidator } from "./activateProcess.val.ts";

export const activateProcessSetup = () =>
  coreApp.acts.setAct({
    schema: "process",
    actName: "activateProcess",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: activateProcessValidator(),
    fn: activateProcessFn,
  });
