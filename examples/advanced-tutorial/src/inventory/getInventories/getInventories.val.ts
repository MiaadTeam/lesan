import { object, objectIdValidation, optional } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getInventoriesValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      storeId: optional(objectIdValidation),
      productId: optional(objectIdValidation),
    }),
    get: selectStruct("inventory", 2),
  });
};
