import { number, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addStockValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      storeId: objectIdValidation,
      productId: objectIdValidation,
      quantity: number(),
      reason: optional(string()),
      description: optional(string()),
      referenceType: optional(string()),
      referenceId: optional(string()),
    }),
    get: selectStruct("inventory", 1),
  });
};
