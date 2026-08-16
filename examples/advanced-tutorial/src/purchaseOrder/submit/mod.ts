import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { submitFn } from "./submit.fn.ts";
import { submitValidator } from "./submit.val.ts";

export const submitSetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "submit",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead", "Employee"], features: ["canRegisterPurchaseOrder"] },
      ]),
    ],
    validator: submitValidator(),
    fn: submitFn,
  });
