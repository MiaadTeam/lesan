import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { cancelFn } from "./cancel.fn.ts";
import { cancelValidator } from "./cancel.val.ts";

export const cancelSetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "cancel",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead"], features: ["canRegisterPurchaseOrder"] },
      ]),
    ],
    validator: cancelValidator(),
    fn: cancelFn,
  });
