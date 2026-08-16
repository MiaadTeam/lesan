import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getTendersFn } from "./getTenders.fn.ts";
import { getTendersValidator } from "./getTenders.val.ts";

export const getTendersSetup = () =>
  coreApp.acts.setAct({
    schema: "tender",
    actName: "getTenders",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getTendersValidator(),
    fn: getTendersFn,
  });
