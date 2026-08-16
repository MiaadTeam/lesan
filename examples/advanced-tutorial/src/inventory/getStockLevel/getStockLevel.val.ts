import { object, objectIdValidation } from "lesan";
import { activeRoleMixin } from "@lib";

export const getStockLevelValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      storeId: objectIdValidation,
      productId: objectIdValidation,
    }),
    get: object({}),
  });
};
