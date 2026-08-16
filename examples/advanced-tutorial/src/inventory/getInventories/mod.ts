import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getInventoriesFn } from "./getInventories.fn.ts";
import { getInventoriesValidator } from "./getInventories.val.ts";

export const getInventoriesSetup = () =>
  coreApp.acts.setAct({
    schema: "inventory",
    actName: "getInventories",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead", "UnitHead", "Employee"] }])],
    validator: getInventoriesValidator(),
    fn: getInventoriesFn,
  });
