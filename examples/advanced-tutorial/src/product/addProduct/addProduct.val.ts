import { array, boolean, defaulted, number, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addProductValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      code: string(),
      price: optional(number()),
      unit: optional(string()),
      active: optional(boolean()),
      description: optional(string()),
      parent: optional(objectIdValidation),
      tags: optional(array(objectIdValidation)),
    }),
    get: selectStruct("product", 1),
  });
};
