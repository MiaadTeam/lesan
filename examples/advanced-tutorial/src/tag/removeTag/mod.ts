import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeTagFn } from "./removeTag.fn.ts";
import { removeTagValidator } from "./removeTag.val.ts";

export const removeTagSetup = () =>
  coreApp.acts.setAct({
    schema: "tag",
    actName: "removeTag",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: removeTagValidator(),
    fn: removeTagFn,
  });
