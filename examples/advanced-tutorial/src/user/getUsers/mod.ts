import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getUsersFn } from "./getUsers.fn.ts";
import { getUsersValidator } from "./getUsers.val.ts";

export const getUsersSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "getUsers",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getUsersValidator(),
    fn: getUsersFn,
  });
