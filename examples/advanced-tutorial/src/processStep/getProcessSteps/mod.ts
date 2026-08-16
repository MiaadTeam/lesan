import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getProcessStepsFn } from "./getProcessSteps.fn.ts";
import { getProcessStepsValidator } from "./getProcessSteps.val.ts";

export const getProcessStepsSetup = () =>
  coreApp.acts.setAct({
    schema: "processStep",
    actName: "getProcessSteps",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee"] }])],
    validator: getProcessStepsValidator(),
    fn: getProcessStepsFn,
  });
