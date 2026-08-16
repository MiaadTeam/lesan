import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { unit_type_emums } from "@model";

export const addUnitValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      code: string(),
      type: unit_type_emums,
      description: optional(string()),
      organization: objectIdValidation,
      head: optional(objectIdValidation),
      parentUnit: optional(objectIdValidation),
    }),
    get: selectStruct("unit", 1),
  });
};
