import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getFilesValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      uploaderId: optional(string()),
    }),
    get: selectStruct("file", 2),
  });
};
