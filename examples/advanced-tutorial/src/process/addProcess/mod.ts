import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addProcessFn } from "./addProcess.fn.ts";
import { addProcessValidator } from "./addProcess.val.ts";

export const addProcessSetup = () =>
  coreApp.acts.setAct({
    schema: "process",
    actName: "addProcess",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: addProcessValidator(),
    fn: addProcessFn,
  });
