import { object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

//// updateWareType
export const updateWareTypeValidator = () => {
  return object({
    set: object({
      _id: string(),
      name: optional(string()),
      description: optional(string()),
    }),
    get: selectStruct("ware", { ware: 1 }),
  });
};
