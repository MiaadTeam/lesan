import { array, object, objectIdValidation, optional } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const updateUserRelationsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      avatar: objectIdValidation,
      organizations: optional(array(objectIdValidation)),
      units: optional(array(objectIdValidation)),
    }),
    get: selectStruct("user", 2),
  });
};
