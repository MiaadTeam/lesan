import {
  array,
  boolean,
  object,
  objectIdValidation,
  optional,
  string,
} from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { feature_enums } from "@model";

export const updateUserValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
      first_name: optional(string()),
      last_name: optional(string()),
      email: optional(string()),
      password: optional(string()),
      position: optional(string()),
      isActive: optional(boolean()),
      features: optional(array(object({ feature: feature_enums }))),
    }),
    get: selectStruct("user", 1),
  });
};
