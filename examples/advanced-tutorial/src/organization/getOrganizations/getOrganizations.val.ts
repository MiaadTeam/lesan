import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getOrganizationsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: optional(string()),
    }),
    get: selectStruct("organization", 2),
  });
};
