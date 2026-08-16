import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getUserFn } from "./getUser.fn.ts";
import { getUserValidator } from "./getUser.val.ts";

export const getUserSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "getUser",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getUserValidator(),
    fn: getUserFn,
  });
