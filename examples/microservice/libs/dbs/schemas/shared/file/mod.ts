import { any, InRelation, number, optional, string } from "../../../deps.ts";

export const pureFileObj = {
    _id: optional(any()),
    fileName: string(),
    type: string(),
    size: number(),
};

export const fileInRel: Record<string, InRelation> = {
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
    blogPost: {
        schemaName: "blogPost",
        type: "one",
        optional: true,
    },
};
export const fileOutRel = {};
