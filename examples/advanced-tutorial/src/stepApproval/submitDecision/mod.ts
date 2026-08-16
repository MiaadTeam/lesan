import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { submitDecisionFn } from "./submitDecision.fn.ts";
import { submitDecisionValidator } from "./submitDecision.val.ts";

export const submitDecisionSetup = () =>
  coreApp.acts.setAct({
    schema: "stepApproval",
    actName: "submitDecision",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead"], features: ["canApprovePurchaseOrder"] },
      ]),
    ],
    validator: submitDecisionValidator(),
    fn: submitDecisionFn,
  });
