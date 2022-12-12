import { object, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const deleteCountryValidator = () => {
    return object({
        set: object({
            _id: string(),
        }),
        get: selectStruct("country", 1),
    });
};
