import { object } from "lesan";
import { selectStruct } from "../../../mod.ts";

export const getMeValidator = () => {
  return object({
    set: object({}),
    get: selectStruct("user", 2),
  });
};
