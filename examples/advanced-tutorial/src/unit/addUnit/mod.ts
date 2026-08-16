import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addUnitFn } from "./addUnit.fn.ts";
import { addUnitValidator } from "./addUnit.val.ts";

export const addUnitSetup = () =>
  coreApp.acts.setAct({
    schema: "unit",
    actName: "addUnit",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead"] }])],
    validator: addUnitValidator(),
    fn: addUnitFn,
  });
