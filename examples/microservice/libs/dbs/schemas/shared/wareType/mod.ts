import { any, boolean, enums, optional, OutRelation, string } from "../../../deps.ts";

export const Features = enums(["Emoji", "Text", "RepeatPattern", "Color", "Pic", "HandWriting", "Layers"]);

export const pureWareTypeObj = {
    _id: optional(any()),
    name: string(),
    description: optional(string()),
    isDesignable: boolean(),
    features: optional(Features),
};

export const wareTypeOutRel: Record<string, OutRelation> = {
    wares: {
        schemaName: "ware",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
    wareCategories: {
        schemaName: "wareCategory",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const wareTypeInRel = {};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("wareType", pureWareTypeObj);
//
// addOutRelations({
//   schemaName: "wareType",
//   outrelation: wareTypeOutRel,
// });
