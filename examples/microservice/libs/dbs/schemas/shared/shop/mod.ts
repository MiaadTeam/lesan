import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

// TODO : add logo
export const pureShopObj = {
    _id: optional(any()),
    name: string(),
    address: optional(string()),
    phone: array(number()),
    location: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
    certificate: string(),
    /**an array of social medias links and icons tuple */
    socialMedias: optional(object({
        instagram: optional(string()),
        twitter: optional(string()),
        telegram: optional(string()),
        faceBook: optional(string()),
        pinterest: optional(string()),
    })),
    aboutUs: string(),
};

export const shopInRel: Record<string, InRelation> = {
    owenr: {
        schemaName: "user",
        type: "one",
        optional: false,
    },
    city: {
        schemaName: "city",
        type: "one",
        optional: false,
    },
    wareTypes: {
        schemaName: "wareTypes",
        type: "many",
        optional: true,
    },
};

export const shopOutRel: Record<string, OutRelation> = {
    orders: {
        schemaName: "order",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};
