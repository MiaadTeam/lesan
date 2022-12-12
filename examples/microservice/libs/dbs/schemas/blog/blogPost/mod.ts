import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";
import { pureFileObj } from "../../shared/file/mod";

import {
    blogPostInRel as sharedblogPostInRel,
    blogPostOutRel as sharedblogPostOutRel,
    pureblogPostObj as sharedPureblogPostObj,
} from "../../shared/mod.ts";

const blogPostPureObj: Partial<typeof sharedPureblogPostObj> = {
    title: string(),
    summary: string(),
    content: string(),
    photo: pureFileObj,
    totalViews: optional(number()),
    totalComments: optional(number()),
    totalLikes: optional(number())
};

const blogPostInRel: Partial<typeof sharedblogPostInRel> = {
    author: {
        schemaName: "user",
        type: "one",
    },

    blogCategory: {
        schemaName: "blogCategory",
        type: "one",
    },
    blogTags: {
        schemaName: "blogTag",
        type: "many"
    }

};

const blogPostOutRel: Partial<typeof sharedblogPostOutRel> = {
    likedUsers: {
        schemaName: "user",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
    comments?: {
        schemaName: "comment",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" }
    }
};

export const blogPosts = () =>
    ecommerceApp.odm.setModel(
        "blogPost",
        blogPostPureObj,
        blogPostInRel as Record<string, InRelation>,
        blogPostOutRel as Record<string, OutRelation>,
    );
