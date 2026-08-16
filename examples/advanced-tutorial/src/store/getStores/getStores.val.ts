import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getStoresValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      unitId: optional(string()),
    }),
    get: selectStruct("store", 2),
  });
};
