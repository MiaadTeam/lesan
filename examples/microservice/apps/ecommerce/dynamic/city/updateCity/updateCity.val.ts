import { array, number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const updateCityValidator = () => {
    return object({
        set: object({
            _id: string(),
            stateId: optional(string()),
            name: optional(string()),
            enName: optional(string()),
            geometries: optional(object({
                type: string(),
                coordinates: array(array(number())),
            })),
        }),
        get: selectStruct("state", 2),
    });
};
