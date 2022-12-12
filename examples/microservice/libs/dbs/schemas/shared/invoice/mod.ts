import { any, InRelation, number, optional, OutRelation } from "../../../deps.ts";

export const pureInvoiceObj = {
    _id: optional(any()),
    totalPrice: number(),
    totalQuantity: number(),
    discount: number(),
};

export const invoiceInRel: Record<string, InRelation> = {
    user: {
        schemaName: "user",
        type: "one",
        optional: false,
    },

    ware: {
        schemaName: "ware",
        type: "one",
        optional: false,
    },
};

export const invoiceOutRel: Record<string, OutRelation> = {};
