import {
    any,
    array,
    boolean,
    date,
    enums,
    InRelation,
    number,
    object,
    optional,
    OutRelation,
    string,
} from "../../../deps.ts";

export const level = enums(["Admin", "Editor", "Author", "Ghost", "Normal"]);
export const gender = enums(["Male", "Female"]);

export const addressObj = object({
    addressId: string(),
    countryId: string(),
    stateId: string(),
    cityId: string(),
    addressText: string(),
    location: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
});

export const pureUserObj = {
    _id: optional(any()),
    name: string(),
    age: number(),
    lastName: string(),
    phone: number(),
    gender: gender,
    birthDate: optional(date()),
    postalCode: string(),
    level: array(level),
    email: optional(string()),
    isActive: optional(boolean()),
    creditCardNumber: optional(number()),
    address: optional(array(addressObj)),
};

export const userInRel: Record<string, InRelation> = {};
// TODO how c
export const userOutRel: Record<string, OutRelation> = {
    blogPosts: {
        schemaName: "blogPosts",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
    orders: {
        schemaName: "order",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

// comment for know because we want create it whenever we create a new server for it
// addPureModel("user", pureUserObj);
//
// addInrelations({
//   schemaName: "user",
//   inrelation: userInRel,
// });
