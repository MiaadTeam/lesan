import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, boolean, date, InRelation, number, optional, OutRelation, string } from "../../../deps.ts";

import {
    addressObj,
    gender,
    level,
    pureUserObj as sharedPureUserObj,
    userInRel as sharedUserInRel,
    userOutRel as sharedUserOutRel,
} from "../../shared/mod.ts";

const userPureObj: Partial<typeof sharedPureUserObj> = {
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

const userInRel: Partial<typeof sharedUserInRel> = {};

const userOutRel: Partial<typeof sharedUserOutRel> = {
    // blogPosts: {
    //     schemaName: "blogPosts",
    //     number: 50,
    //     sort: { type: "objectId", field: "_id", order: "desc" },
    // },
    orders: {
        schemaName: "order",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const users = () =>
    ecommerceApp.odm.setModel(
        "user",
        userPureObj,
        userInRel as Record<string, InRelation>,
        userOutRel as Record<string, OutRelation>,
    );
