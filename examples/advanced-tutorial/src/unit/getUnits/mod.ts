import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getUnitsFn } from "./getUnits.fn.ts";
import { getUnitsValidator } from "./getUnits.val.ts";

export const getUnitsSetup = () =>
  coreApp.acts.setAct({
    schema: "unit",
    actName: "getUnits",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getUnitsValidator(),
    fn: getUnitsFn,
  });
