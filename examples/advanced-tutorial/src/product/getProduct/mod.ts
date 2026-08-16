import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getProductFn } from "./getProduct.fn.ts";
import { getProductValidator } from "./getProduct.val.ts";

export const getProductSetup = () =>
  coreApp.acts.setAct({
    schema: "product",
    actName: "getProduct",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getProductValidator(),
    fn: getProductFn,
  });
