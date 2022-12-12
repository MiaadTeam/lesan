import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    pureShopObj as sharedPureShopObj,
    shopInRel as sharedShopInRel,
    shopOutRel as sharedShopOutRel,
} from "../../shared/mod.ts";

const shopPureObj: Partial<typeof sharedPureShopObj> = {
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

const shopInRel: Partial<typeof sharedShopInRel> = {
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

const shopOutRel: Partial<typeof sharedShopOutRel> = {
    orders: {
        schemaName: "order",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const shops = () =>
    ecommerceApp.odm.setModel(
        "shop",
        shopPureObj,
        shopInRel as Record<string, InRelation>,
        shopOutRel as Record<string, OutRelation>,
    );
