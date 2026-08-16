import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getProductsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      search: optional(string()),
      tagId: optional(string()),
    }),
    get: selectStruct("product", 2),
  });
};
