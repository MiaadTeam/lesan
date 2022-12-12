import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, InRelation, number, optional, string } from "../../../deps.ts";

import { fileInRel as sharedFileInRel, pureFileObj as sharedPureFileObj } from "../../shared/mod.ts";

export const filePureObj: Partial<typeof sharedPureFileObj> = {
    _id: any(),
    fileName: string(),
    type: string(),
    size: number(),
};

export const fileInRel: Partial<typeof sharedFileInRel> = {
    user: {
        schemaName: "user",
        type: "one",
        optional: true,
    },
    ware: {
        schemaName: "ware",
        type: "one",
        optional: true,
    },
    wareType: {
        schemaName: "wareType",
        type: "one",
        optional: true,
    },
};

export const fileOutRel = {};

export const files = () =>
    ecommerceApp.odm.setModel(
        "file",
        filePureObj,
        fileInRel as Record<string, InRelation>,
        fileOutRel,
    );
