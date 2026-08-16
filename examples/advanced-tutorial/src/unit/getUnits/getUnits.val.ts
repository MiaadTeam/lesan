import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getUnitsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      organizationId: optional(string()),
    }),
    get: selectStruct("unit", 2),
  });
};
