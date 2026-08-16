import { object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { tender_status_emums } from "@model";

export const addTenderValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      title: string(),
      status: optional(tender_status_emums),
      deadline: optional(string()),
      description: optional(string()),
      organization: optional(objectIdValidation),
    }),
    get: selectStruct("tender", 1),
  });
};
