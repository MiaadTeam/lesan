import {
    array,
    number,
    object,
    optional,
    enums,
    OutRelation,
    string,
} from "../../../deps.ts";

export enum BlogCommentStatus {
    ACCEPTED,
    PENDING,
    REJECTED,
}

export const pureBlogComment = {
    content: string(),
    commentStatus: enums(Object.keys(BlogCommentStatus))
};

export const blogCommentInRel = {};

export const blogCommentOutRel: Record<string, OutRelation> = {};