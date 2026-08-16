import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addTagFn } from "./addTag.fn.ts";
import { addTagValidator } from "./addTag.val.ts";

export const addTagSetup = () =>
  coreApp.acts.setAct({
    schema: "tag",
    actName: "addTag",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: addTagValidator(),
    fn: addTagFn,
  });
