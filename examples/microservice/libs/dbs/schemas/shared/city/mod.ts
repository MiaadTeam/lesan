import { any, array, number, object, optional, OutRelation, string } from "../../../deps.ts";

export const pureCityObj = {
    _id: optional(any()),
    name: string(),
    enName: optional(string()),
    geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
};

export const cityInRel = {
    state: {
        schemaName: "state",
        type: "one",
        optional: false,
    },
};

export const cityOutRel: Record<string, OutRelation> = {
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
