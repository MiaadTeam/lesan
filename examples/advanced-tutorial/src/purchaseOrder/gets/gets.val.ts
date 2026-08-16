import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";
import { pagination } from "@lib";
import { purchaseOrder_status_emums } from "@model";

export const getsValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      search: optional(string()),
      status: optional(purchaseOrder_status_emums),
      organizationId: optional(string()),
      requestingUnitId: optional(string()),
      requesterId: optional(string()),
      ...pagination,
    }),
    get: selectStruct("purchaseOrder", 1),
  });
};
