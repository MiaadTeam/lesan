import { any, InRelation, optional, OutRelation, string } from "../../../deps.ts";

export const pureWareCategoryObj = {
    _id: optional(any()),
    name: string(),
};

export const wareCategoryOutRel: Record<string, OutRelation> = {
    wares: {
        schemaName: "ware",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const wareCategoryInRel: Record<string, InRelation> = {
    wareType: {
        schemaName: "wareType",
        type: "one",
        optional: false,
    },
};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("wareType", pureWareTypeObj);
//
// addOutRelations({
//   schemaName: "wareType",
//   outrelation: wareTypeOutRel,
// });
