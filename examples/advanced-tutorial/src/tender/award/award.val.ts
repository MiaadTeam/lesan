import { object, objectIdValidation, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const awardValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      tenderId: objectIdValidation,
      supplier: string(),
    }),
    get: selectStruct("tender", 1),
  });
};
