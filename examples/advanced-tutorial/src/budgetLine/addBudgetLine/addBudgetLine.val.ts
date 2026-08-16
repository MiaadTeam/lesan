import { number, object, objectIdValidation, optional, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addBudgetLineValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      code: string(),
      title: string(),
      year: number(),
      totalAllocated: optional(number()),
      startDate: optional(string()),
      endDate: optional(string()),
      organization: optional(objectIdValidation),
    }),
    get: selectStruct("budgetLine", 1),
  });
};
