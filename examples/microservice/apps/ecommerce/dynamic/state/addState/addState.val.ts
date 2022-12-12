import { array, number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const addStateValidator = () => {
    return object({
        set: object({
            countryId: string(),
            name: string(),
            enName: string(),
            geometries: optional(object({
                type: string(),
                coordinates: array(array(number())),
            })),
        }),
        get: selectStruct("state", 2),
    });
};
