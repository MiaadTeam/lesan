import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const updateTagValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      name: optional(string()),
      color: optional(string()),
    }),
    get: selectStruct("tag", 1),
  });
};
