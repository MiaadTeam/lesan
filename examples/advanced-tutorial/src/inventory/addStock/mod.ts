import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addStockFn } from "./addStock.fn.ts";
import { addStockValidator } from "./addStock.val.ts";

export const addStockSetup = () =>
  coreApp.acts.setAct({
    schema: "inventory",
    actName: "addStock",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "StoreHead"] }])],
    validator: addStockValidator(),
    fn: addStockFn,
  });
