import { number, object, objectIdValidation, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { activeRoleMixin } from "@lib";

export const addOfferValidator = () => {
  return object({
    set: object({
      ...activeRoleMixin,
      tenderId: objectIdValidation,
      supplier: string(),
      price: number(),
      score: number(),
      submittedAt: string(),
    }),
    get: selectStruct("tender", 1),
  });
};
