import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { finalizeFn } from "./finalize.fn.ts";
import { finalizeValidator } from "./finalize.val.ts";

export const finalizeSetup = () =>
  coreApp.acts.setAct({
    schema: "purchaseOrder",
    actName: "finalize",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead"], features: ["canConfirmGoodsReceipt"] },
      ]),
    ],
    validator: finalizeValidator(),
    fn: finalizeFn,
  });
