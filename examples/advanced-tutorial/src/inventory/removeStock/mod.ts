import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeStockFn } from "./removeStock.fn.ts";
import { removeStockValidator } from "./removeStock.val.ts";

export const removeStockSetup = () =>
  coreApp.acts.setAct({
    schema: "inventory",
    actName: "removeStock",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead"] }])],
    validator: removeStockValidator(),
    fn: removeStockFn,
  });
