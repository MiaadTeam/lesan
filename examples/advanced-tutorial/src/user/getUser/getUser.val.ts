import { object, objectIdValidation, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getUserValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
    }),
    get: selectStruct("user", 2),
  });
};
