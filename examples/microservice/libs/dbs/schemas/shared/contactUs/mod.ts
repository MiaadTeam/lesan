import { any, array, optional, OutRelation, string } from "../../../deps.ts";

export const pureContactUsObj = {
    _id: optional(any()),
    name: string(),
    email: string(),
    uploadedFiles: array(string()),
    message: string,
};

export const contactUsInRel = {};

export const contactUsOutRel: Record<string, OutRelation> = {};
