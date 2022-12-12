import { any, array, enums, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";
export const Rate = enums([1, 2, 3, 4, 5]);
export const pureRateObj = {
    _id: optional(any()),
    totalRate: number(),
    rates: array(object({
        userId: string(),
        rate: Rate,
    })),
};

export const rateInRel: Record<string, InRelation> = {
    ware: {
        schemaName: "ware",
        type: "one",
        optional: false,
    },
};

export const rateOutRel: Record<string, OutRelation> = {};
