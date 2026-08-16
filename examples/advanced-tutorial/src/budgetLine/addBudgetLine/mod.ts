import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addBudgetLineFn } from "./addBudgetLine.fn.ts";
import { addBudgetLineValidator } from "./addBudgetLine.val.ts";

export const addBudgetLineSetup = () =>
  coreApp.acts.setAct({
    schema: "budgetLine",
    actName: "addBudgetLine",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"], features: ["canManageBudget"] }])],
    validator: addBudgetLineValidator(),
    fn: addBudgetLineFn,
  });
