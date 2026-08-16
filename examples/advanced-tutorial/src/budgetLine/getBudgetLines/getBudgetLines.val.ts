import { object, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const getBudgetLinesValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      organizationId: optional(string()),
      year: optional(string()),
    }),
    get: selectStruct("budgetLine", 2),
  });
};
