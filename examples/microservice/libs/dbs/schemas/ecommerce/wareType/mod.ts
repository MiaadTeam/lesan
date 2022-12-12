import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, boolean, optional, OutRelation, string } from "../../../deps.ts";

import {
    Features,
    pureWareTypeObj as sharedPureWareTypeObj,
    wareTypeOutRel as sharedWareTypeOutRel,
} from "../../shared/mod.ts";

const wareTypePureObj: Partial<typeof sharedPureWareTypeObj> = {
    _id: optional(any()),
    name: string(),
    description: optional(string()),
    isDesignable: boolean(),
    features: optional(Features),
};

const wareTypeInRel = {};

const wareTypeOutRel: Partial<typeof sharedWareTypeOutRel> = {
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

export const wareTypes = () =>
    ecommerceApp.odm.setModel(
        "wareType",
        wareTypePureObj,
        wareTypeInRel,
        wareTypeOutRel as Record<string, OutRelation>,
    );
