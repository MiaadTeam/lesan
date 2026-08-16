import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addProcessStepFn } from "./addProcessStep.fn.ts";
import { addProcessStepValidator } from "./addProcessStep.val.ts";

export const addProcessStepSetup = () =>
  coreApp.acts.setAct({
    schema: "processStep",
    actName: "addProcessStep",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: addProcessStepValidator(),
    fn: addProcessStepFn,
  });
