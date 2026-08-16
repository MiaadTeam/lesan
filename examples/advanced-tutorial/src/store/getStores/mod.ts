import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getStoresFn } from "./getStores.fn.ts";
import { getStoresValidator } from "./getStores.val.ts";

export const getStoresSetup = () =>
  coreApp.acts.setAct({
    schema: "store",
    actName: "getStores",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getStoresValidator(),
    fn: getStoresFn,
  });
