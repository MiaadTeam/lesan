import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getBudgetLinesFn } from "./getBudgetLines.fn.ts";
import { getBudgetLinesValidator } from "./getBudgetLines.val.ts";

export const getBudgetLinesSetup = () =>
  coreApp.acts.setAct({
    schema: "budgetLine",
    actName: "getBudgetLines",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead"] }])],
    validator: getBudgetLinesValidator(),
    fn: getBudgetLinesFn,
  });
