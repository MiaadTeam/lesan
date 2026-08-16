import { object, objectIdValidation } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getPendingByUnitValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      unitId: objectIdValidation,
    }),
    get: selectStruct("stepApproval", 2),
  });
};
