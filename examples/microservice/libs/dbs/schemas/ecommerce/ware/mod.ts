import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, Infer, InRelation, number, optional, string } from "../../../deps.ts";

import { pureWareObj as sharedPureWareObj, wareInRel as sharedWareInRel } from "../../shared/mod.ts";

const warePureObj: Partial<typeof sharedPureWareObj> = {
    _id: optional(any()),
    name: string(),
    brand: string(),
    price: number(),
    description: optional(string()),
};

const wareInRel: Partial<typeof sharedWareInRel> = {
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

const wareOutRel = {};

export const wares = () =>
    ecommerceApp.odm.setModel(
        "ware",
        warePureObj,
        wareInRel as Record<string, InRelation>,
        wareOutRel,
    );
