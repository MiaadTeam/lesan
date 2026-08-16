import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getProductsFn } from "./getProducts.fn.ts";
import { getProductsValidator } from "./getProducts.val.ts";

export const getProductsSetup = () =>
  coreApp.acts.setAct({
    schema: "product",
    actName: "getProducts",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getProductsValidator(),
    fn: getProductsFn,
  });
