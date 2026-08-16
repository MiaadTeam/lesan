import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeFn } from "./remove.fn.ts";
import { removeValidator } from "./remove.val.ts";

export const removeSetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "remove",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: removeValidator(),
    fn: removeFn,
  });
