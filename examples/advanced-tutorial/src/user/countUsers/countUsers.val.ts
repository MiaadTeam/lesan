import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const countUsersValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      search: optional(string()),
    }),
    get: selectStruct("user", 1),
  });
};
