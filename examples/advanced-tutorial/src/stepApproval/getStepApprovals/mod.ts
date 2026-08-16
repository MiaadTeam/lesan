import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getStepApprovalsFn } from "./getStepApprovals.fn.ts";
import { getStepApprovalsValidator } from "./getStepApprovals.val.ts";

export const getStepApprovalsSetup = () =>
  coreApp.acts.setAct({
    schema: "stepApproval",
    actName: "getStepApprovals",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getStepApprovalsValidator(),
    fn: getStepApprovalsFn,
  });
