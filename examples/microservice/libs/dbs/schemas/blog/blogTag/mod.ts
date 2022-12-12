import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    blogTagInRel as sharedblogTagInRel,
    blogTagOutRel as sharedblogTagOutRel,
    pureblogTagObj as sharedPureblogTagObj,
} from "../../shared/mod.ts";

const blogTagPureObj: Partial<typeof sharedPureblogTagObj> = {
    name: string(),
};

const blogTagInRel: Partial<typeof sharedblogTagInRel> = {};

const blogTagOutRel: Partial<typeof sharedblogTagOutRel> = {
    blogPost: {
        schemaName: "blogPost",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    }
};

export const blogTags = () =>
    ecommerceApp.odm.setModel(
        "blogTag",
        blogTagPureObj,
        blogTagInRel as Record<string, InRelation>,
        blogTagOutRel as Record<string, OutRelation>,
    );
