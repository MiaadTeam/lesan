import { enums, number, object, optional, string } from "../../../deps.ts";
import { selectStruct } from "../../../mod.ts";

const isSort = enums([1, -1]);

export const getStatesValidator = () => {
    return object({
        set: object({
            name: optional(string()),
            countryId: optional(string()),
            pagination: optional(
                object({
                    lastObjectId: optional(string()),
                    limit: optional(number()),
                    page: optional(number()),
                }),
            ),
            sort: object({
                _id: optional(isSort),
                name: optional(isSort),
            }),
        }),
        get: selectStruct("state", { cities: 1, country: 1 }),
    });
};
