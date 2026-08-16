import { array, object, objectIdValidation, optional } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const updateRelationsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      requester: optional(objectIdValidation),
      organization: optional(objectIdValidation),
      requestingUnit: optional(objectIdValidation),
      product: optional(objectIdValidation),
      process: optional(objectIdValidation),
      attachments: optional(array(objectIdValidation)),
      budgetLine: optional(objectIdValidation),
      tender: optional(objectIdValidation),
    }),
    get: selectStruct("purchaseOrder", 2),
  });
};
