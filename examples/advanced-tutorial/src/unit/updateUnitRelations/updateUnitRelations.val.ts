import { object, objectIdValidation, optional } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const updateUnitRelationsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      organization: optional(objectIdValidation),
      head: optional(objectIdValidation),
      parentUnit: optional(objectIdValidation),
    }),
    get: selectStruct("unit", 2),
  });
};
