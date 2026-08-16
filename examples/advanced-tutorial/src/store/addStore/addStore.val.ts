import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addStoreValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      code: string(),
      address: optional(string()),
      unit: optional(objectIdValidation),
    }),
    get: selectStruct("store", 1),
  });
};
