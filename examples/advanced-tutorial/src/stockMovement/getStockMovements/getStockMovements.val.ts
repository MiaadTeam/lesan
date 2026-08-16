import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getStockMovementsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      storeId: optional(objectIdValidation),
      productId: optional(objectIdValidation),
      reason: optional(string()),
    }),
    get: selectStruct("stockMovement", 2),
  });
};
