import { object, optional, string } from "lesan";
import { activeRoleMixin } from "@lib";
import { purchaseOrder_status_emums } from "@model";

export const countValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      status: optional(purchaseOrder_status_emums),
      organizationId: optional(string()),
      requestingUnitId: optional(string()),
    }),
    get: object({}),
  });
};
