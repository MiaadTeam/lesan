import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getPendingByUnitFn } from "./getPendingByUnit.fn.ts";
import { getPendingByUnitValidator } from "./getPendingByUnit.val.ts";

export const getPendingByUnitSetup = () =>
  coreApp.acts.setAct({
    schema: "stepApproval",
    actName: "getPendingByUnit",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "UnitHead", "Employee"] }])],
    validator: getPendingByUnitValidator(),
    fn: getPendingByUnitFn,
  });
