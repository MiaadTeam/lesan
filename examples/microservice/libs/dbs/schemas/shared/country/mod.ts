import { any, array, number, object, optional, OutRelation, string } from "../../../deps.ts";

export const pureCountryObj = {
    name: string(),
    _id: optional(any()),
    enName: optional(string()),
    countryCode: optional(array(string())),
    geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
};

export const countryInRel = {};

export const countryOutRel: Record<string, OutRelation> = {
    states: {
        schemaName: "state",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
    users: {
        schemaName: "user",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("country", pureCountryObj);
//
// addOutRelations({
//   schemaName: "country",
//   outrelation: countryOutRel,
// });
//
// addInrelations({
//   schemaName: "country",
//   inrelation: countryInRel,
// });
