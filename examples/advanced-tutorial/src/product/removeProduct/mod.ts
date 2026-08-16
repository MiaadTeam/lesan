import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeProductFn } from "./removeProduct.fn.ts";
import { removeProductValidator } from "./removeProduct.val.ts";

export const removeProductSetup = () =>
  coreApp.acts.setAct({
    schema: "product",
    actName: "removeProduct",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: removeProductValidator(),
    fn: removeProductFn,
  });
