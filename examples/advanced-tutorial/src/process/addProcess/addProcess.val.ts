import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { process_status_emums } from "@model";

export const addProcessValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      name: string(),
      description: optional(string()),
      status: optional(process_status_emums),
      organization: objectIdValidation,
      unit: optional(objectIdValidation),
      product: optional(objectIdValidation),
    }),
    get: selectStruct("process", 1),
  });
};
