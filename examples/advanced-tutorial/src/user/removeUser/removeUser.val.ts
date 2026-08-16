import { object, objectIdValidation } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const removeUserValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
    }),
    get: selectStruct("user", 1),
  });
};
