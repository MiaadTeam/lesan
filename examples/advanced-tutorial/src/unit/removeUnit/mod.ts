import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeUnitFn } from "./removeUnit.fn.ts";
import { removeUnitValidator } from "./removeUnit.val.ts";

export const removeUnitSetup = () =>
  coreApp.acts.setAct({
    schema: "unit",
    actName: "removeUnit",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: removeUnitValidator(),
    fn: removeUnitFn,
  });
