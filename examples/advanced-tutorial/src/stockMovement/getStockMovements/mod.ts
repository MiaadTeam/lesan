import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getStockMovementsFn } from "./getStockMovements.fn.ts";
import { getStockMovementsValidator } from "./getStockMovements.val.ts";

export const getStockMovementsSetup = () =>
  coreApp.acts.setAct({
    schema: "stockMovement",
    actName: "getStockMovements",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead", "UnitHead", "Employee"] }])],
    validator: getStockMovementsValidator(),
    fn: getStockMovementsFn,
  });
