import { array, object, objectIdValidation, optional } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const updateProductRelationsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      parent: optional(objectIdValidation),
      tags: optional(array(objectIdValidation)),
    }),
    get: selectStruct("product", 2),
  });
};
