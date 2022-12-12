import { any, boolean, InRelation, number, optional, string } from "../../../deps.ts";

export const pureWareObj = {
    _id: optional(any()),
    name: string(),
    brand: string(),
    price: number(),
    description: optional(string()),
    isDesigned: boolean(),
    totalRate: number(),
};

export const wareInRel: Record<string, InRelation> = {
    warType: {
        schemaName: "wareType",
        type: "one",
        optional: false,
    },
    wareCategories: {
        schemaName: "wareCategory",
        type: "many",
        optional: true,
    },
};

export const wareOutRel = {};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("ware", pureWareObj);
//
// addInrelations({
//   schemaName: "ware",
//   inrelation: wareInRel,
// });
