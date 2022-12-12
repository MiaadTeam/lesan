import { number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const addWareValidator = () => {
  return object({
    set: object({
      name: string(),
      brand: string(),
      price: number(),
      description: optional(string()),
      wareTypeId: string(),
    }),
    get: selectStruct("ware", { wareType: 1 }),
  });
};
