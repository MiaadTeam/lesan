import {
  array,
  boolean,
  defaulted,
  object,
  objectIdValidation,
  optional,
  string,
} from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { feature_enums } from "@model";

export const addUserValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      first_name: string(),
      last_name: string(),
      email: string(),
      password: string(),
      position: optional(string()),
      isActive: defaulted(boolean(), true),
      features: optional(array(object({ feature: feature_enums }))),
      avatar: optional(objectIdValidation),
      organizations: optional(array(objectIdValidation)),
      units: optional(array(objectIdValidation)),
    }),
    get: selectStruct("user", 1),
  });
};
