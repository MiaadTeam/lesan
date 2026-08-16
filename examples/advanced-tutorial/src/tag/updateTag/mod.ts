import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateTagFn } from "./updateTag.fn.ts";
import { updateTagValidator } from "./updateTag.val.ts";

export const updateTagSetup = () =>
  coreApp.acts.setAct({
    schema: "tag",
    actName: "updateTag",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: updateTagValidator(),
    fn: updateTagFn,
  });
