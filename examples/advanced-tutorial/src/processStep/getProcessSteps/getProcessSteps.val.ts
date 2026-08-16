import { object, objectIdValidation } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getProcessStepsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      processId: objectIdValidation,
    }),
    get: selectStruct("processStep", 2),
  });
};
