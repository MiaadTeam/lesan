import { object, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const getCountryValidator = () => {
    return object({
        set: object({
            _id: string(),
        }),
        get: selectStruct("country", 3),
    });
};
