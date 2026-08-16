import { array, enums, number, object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { role_array } from "@model";
import { activeRoleMixin, pagination } from "@lib";

export const getUsersValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      ...pagination,
      search: optional(string()),
      roles: optional(array(enums(role_array))),
      sortBy: optional(enums(["createdAt", "updatedAt", "first_name", "last_name", "email"])),
      sortOrder: optional(enums(["asc", "desc"])),
    }),
    get: selectStruct("user", 2),
  });
};
