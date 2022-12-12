import { number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const addWareTypeValidator = () => {
  return object({
    set: object({
      name: string(),
      description: optional(string()),
    }),
    get: selectStruct("ware", { ware: 1 }),
  });
};
