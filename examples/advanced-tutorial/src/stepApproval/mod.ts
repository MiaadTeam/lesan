import { submitDecisionSetup } from "./submitDecision/mod.ts";
import { getPendingByUnitSetup } from "./getPendingByUnit/mod.ts";
import { getStepApprovalsSetup } from "./getStepApprovals/mod.ts";

export const stepApprovalSetup = () => {
  submitDecisionSetup();
  getPendingByUnitSetup();
  getStepApprovalsSetup();
};
