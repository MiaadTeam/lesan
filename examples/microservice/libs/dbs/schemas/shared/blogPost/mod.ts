import { array, number, object, optional, OutRelation, string } from "../../../deps.ts";
import { pureFileObj } from "../file/mod.ts";

export const pureBlogPost = {
    title: string(),
    summary: string(),
    content: string(),
    photo: object(pureFileObj),
    totalViews: optional(number()),
    totalComments: optional(number()),
    totalLikes: optional(number()),
};

export const blogPostInRel = {
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
        type: "many",
    },
};

export const blogPostOutRel: Record<string, OutRelation> = {
    likedUsers: {
        schemaName: "user",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
    comments: {
        schemaName: "comment",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};
