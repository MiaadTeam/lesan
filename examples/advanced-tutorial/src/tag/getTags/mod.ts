import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getTagsFn } from "./getTags.fn.ts";
import { getTagsValidator } from "./getTags.val.ts";

export const getTagsSetup = () =>
  coreApp.acts.setAct({
    schema: "tag",
    actName: "getTags",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getTagsValidator(),
    fn: getTagsFn,
  });
