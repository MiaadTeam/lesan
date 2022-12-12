import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { array, InRelation, number, object, optional, OutRelation, string, enums } from "../../../deps.ts";

import {
    blogCommentInRel as sharedblogCommentInRel,
    blogCommentOutRel as sharedblogCommentOutRel,
    pureblogCommentObj as sharedPureblogCommentObj,
} from "../../shared/mod.ts";

enum BlogCommentStatus {
    ACCEPTED,
    PENDING,
    REJECTED,
}

const blogCommentPureObj: Partial<typeof sharedPureblogCommentObj> = {
    content: string(),
    commentStatus: enums(Object.keys(BlogCommentStatus))

};

const blogCommentInRel: Partial<typeof sharedblogCommentInRel> = {};

const blogCommentOutRel: Partial<typeof sharedblogCommentOutRel> = {
    blogPost: {
        schemaName: "blogPost",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    }
};

export const blogComments = () =>
    ecommerceApp.odm.setModel(
        "blogComment",
        blogCommentPureObj,
        blogCommentInRel as Record<string, InRelation>,
        blogCommentOutRel as Record<string, OutRelation>,
    );
