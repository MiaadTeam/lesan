import { object, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const getCityValidator = () => {
    return object({
        set: object({
            _id: string(),
        }),
        get: selectStruct("city", 2),
    });
};
