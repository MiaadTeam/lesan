import { object } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getTagsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
    }),
    get: selectStruct("tag", 2),
  });
};
