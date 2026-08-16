import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateUserFn } from "./updateUser.fn.ts";
import { updateUserValidator } from "./updateUser.val.ts";

export const updateUserSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "updateUser",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: updateUserValidator(),
    fn: updateUserFn,
  });
