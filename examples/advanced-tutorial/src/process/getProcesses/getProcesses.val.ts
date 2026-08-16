import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { process_status_emums } from "@model";

export const getProcessesValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      organizationId: optional(string()),
      status: optional(process_status_emums),
    }),
    get: selectStruct("process", 2),
  });
};
