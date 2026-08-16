import { enums, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const submitDecisionValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      approvalId: objectIdValidation,
      decision: enums(["approved", "rejected"]),
      comment: optional(string()),
    }),
    get: selectStruct("purchaseOrder", 1),
  });
};
