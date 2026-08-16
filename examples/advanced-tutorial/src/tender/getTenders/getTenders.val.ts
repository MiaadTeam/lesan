import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { tender_status_emums } from "@model";

export const getTendersValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      status: optional(tender_status_emums),
      organizationId: optional(string()),
    }),
    get: selectStruct("tender", 2),
  });
};
