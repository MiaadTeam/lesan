import { array, number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const updateStateValidator = () => {
    return object({
        set: object({
            _id: string(),
            countryId: optional(string()),
            name: optional(string()),
            enName: optional(string()),
            geometries: optional(object({
                type: string(),
                coordinates: array(array(number())),
            })),
        }),
        get: selectStruct("state", 1),
    });
};
