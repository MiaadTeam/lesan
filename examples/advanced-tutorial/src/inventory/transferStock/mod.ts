import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { transferStockFn } from "./transferStock.fn.ts";
import { transferStockValidator } from "./transferStock.val.ts";

export const transferStockSetup = () =>
  coreApp.acts.setAct({
    schema: "inventory",
    actName: "transferStock",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead"] }])],
    validator: transferStockValidator(),
    fn: transferStockFn,
  });
