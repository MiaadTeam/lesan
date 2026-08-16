import { object, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addTagValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      color: string(),
    }),
    get: selectStruct("tag", 1),
  });
};
