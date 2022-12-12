import { array, number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const addCountryValidator = () => {
  return object({
    set: object({
      name: string(),
      enName: string(),
      countryCode: optional(array(string())),
      geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
      })),
    }),
    get: selectStruct("country", 1),
  });
};
