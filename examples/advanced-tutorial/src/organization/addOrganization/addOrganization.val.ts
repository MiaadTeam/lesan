import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addOrganizationValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      code: string(),
      description: optional(string()),
      parent: optional(objectIdValidation),
    }),
    get: selectStruct("organization", 1),
  });
};
