import { object, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

export const deleteCityValidator = () => {
    return object({
        set: object({
            _id: string(),
        }),
    });
};
