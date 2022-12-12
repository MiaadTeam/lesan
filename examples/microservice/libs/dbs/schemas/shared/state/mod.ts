import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

export const pureStateObj = {
    _id: optional(any()),
    name: string(),
    enName: optional(string()),
    geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
};

export const stateInRel: Record<string, InRelation> = {
    country: {
        schemaName: "country",
        type: "one",
        optional: false,
    },
    cities: {
        schemaName: "city",
        type: "many",
        optional: true,
    },
};

export const stateOutRel: Record<string, OutRelation> = {};
