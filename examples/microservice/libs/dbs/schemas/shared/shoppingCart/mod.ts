import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

export const pureShoppingCartObj = {
    _id: optional(any()),
    totalPrice: number(),
    totalQuantity: number(),
    description: optional(string()),
    wares: array(object({
        wareId: string(),
        quantity: number(),
        sumPrice: number(),
        description: optional(string()),
    })),
};

export const shoppingCartInRel: Record<string, InRelation> = {
    user: {
        schemaName: "user",
        type: "one",
        optional: false,
    },
};

export const shoppingCartOutRel: Record<string, OutRelation> = {};
