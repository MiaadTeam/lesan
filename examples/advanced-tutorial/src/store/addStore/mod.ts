import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addStoreFn } from "./addStore.fn.ts";
import { addStoreValidator } from "./addStore.val.ts";

export const addStoreSetup = () =>
  coreApp.acts.setAct({
    schema: "store",
    actName: "addStore",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead"] }])],
    validator: addStoreValidator(),
    fn: addStoreFn,
  });
