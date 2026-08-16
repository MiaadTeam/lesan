import { array, defaulted, number, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { purchaseOrder_status_emums } from "@model";

export const addValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      title: string(),
      description: optional(string()),
      estimatedAmount: optional(number()),
      status: optional(purchaseOrder_status_emums),
      requestedAt: optional(string()),
      requester: objectIdValidation,
      organization: optional(objectIdValidation),
      requestingUnit: optional(objectIdValidation),
      product: objectIdValidation,
      process: optional(objectIdValidation),
      attachments: optional(array(objectIdValidation)),
      budgetLine: optional(objectIdValidation),
    }),
    get: selectStruct("purchaseOrder", 1),
  });
};
