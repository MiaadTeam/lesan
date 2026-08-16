import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addFn } from "./add.fn.ts";
import { addValidator } from "./add.val.ts";

export const addSetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "add",
    validationRunType: "create",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead", "Employee"], features: ["canRegisterPurchaseOrder"] },
      ]),
    ],
    validator: addValidator(),
    fn: addFn,
  });
