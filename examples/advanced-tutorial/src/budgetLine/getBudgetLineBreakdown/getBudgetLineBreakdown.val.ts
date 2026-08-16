import { object, objectIdValidation } from "lesan";
import { activeRoleMixin } from "@lib";

export const getBudgetLineBreakdownValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      _id: objectIdValidation,
    }),
    get: object({}),
  });
};
