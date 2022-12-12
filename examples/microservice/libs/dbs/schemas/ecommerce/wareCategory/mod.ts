import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, InRelation, optional, OutRelation, string } from "../../../deps.ts";

import {
    pureWareCategoryObj as sharedPureWareCategoryObj,
    wareCategoryInRel as sharedWareCategoryInRel,
    wareCategoryOutRel as sharedWareCategoryOutRel,
} from "../../shared/mod.ts";

const wareCategoryPureObj: Partial<typeof sharedPureWareCategoryObj> = {
    _id: optional(any()),
    name: string(),
};

const wareCategoryInRel: Partial<typeof sharedWareCategoryInRel> = {
    warType: {
        schemaName: "wareType",
        type: "one",
        optional: false,
    },
};

const wareCatgeoryOutRel: Partial<typeof sharedWareCategoryOutRel> = {
    wares: {
        schemaName: "ware",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const wareCategories = () =>
    ecommerceApp.odm.setModel(
        "wareCategory",
        wareCategoryPureObj,
        wareCategoryInRel as Record<string, InRelation>,
        wareCatgeoryOutRel as Record<string, OutRelation>,
    );
