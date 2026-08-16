import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getHistoryFn } from "./getHistory.fn.ts";
import { getHistoryValidator } from "./getHistory.val.ts";

export const getHistorySetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "getHistory",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getHistoryValidator(),
    fn: getHistoryFn,
  });
