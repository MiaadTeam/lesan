import { object, objectIdValidation } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getStepApprovalsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      purchaseOrderId: objectIdValidation,
    }),
    get: selectStruct("stepApproval", 2),
  });
};
