import { number, object, objectIdValidation } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const transferStockValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      fromStoreId: objectIdValidation,
      toStoreId: objectIdValidation,
      productId: objectIdValidation,
      quantity: number(),
    }),
    get: selectStruct("inventory", 1),
  });
};
