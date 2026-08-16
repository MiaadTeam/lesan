import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addProductFn } from "./addProduct.fn.ts";
import { addProductValidator } from "./addProduct.val.ts";

export const addProductSetup = () =>
  coreApp.acts.setAct({
    schema: "product",
    actName: "addProduct",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: addProductValidator(),
    fn: addProductFn,
  });
