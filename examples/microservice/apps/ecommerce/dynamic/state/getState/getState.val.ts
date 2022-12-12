import { object, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const getStateValidator = () => {
  return object({
    set: object({
      _id: string(),
    }),
    get: selectStruct("state", {
      country: {
        states: {
          country: 1,
        },
      },
    }),
  });
};
