import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getBudgetLineBreakdownFn } from "./getBudgetLineBreakdown.fn.ts";
import { getBudgetLineBreakdownValidator } from "./getBudgetLineBreakdown.val.ts";

export const getBudgetLineBreakdownSetup = () =>
  coreApp.acts.setAct({
    schema: "budgetLine",
    actName: "getBudgetLineBreakdown",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead"] }])],
    validator: getBudgetLineBreakdownValidator(),
    fn: getBudgetLineBreakdownFn,
  });
