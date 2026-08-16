import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getStockLevelFn } from "./getStockLevel.fn.ts";
import { getStockLevelValidator } from "./getStockLevel.val.ts";

export const getStockLevelSetup = () =>
  coreApp.acts.setAct({
    schema: "inventory",
    actName: "getStockLevel",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead", "UnitHead", "Employee"] }])],
    validator: getStockLevelValidator(),
    fn: getStockLevelFn,
  });
