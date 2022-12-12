import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    pureShoppingCartObj as sharedPureShoppingCartObj,
    shoppingCartInRel as sharedShoppingCartInRel,
    shoppingCartOutRel as sharedShoppingCartOutRel,
} from "../../shared/mod.ts";

const shoppingCartPureObj: Partial<typeof sharedPureShoppingCartObj> = {
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

const shoppingCartInRel: Partial<typeof sharedShoppingCartInRel> = {
    user: {
        schemaName: "user",
        type: "one",
        optional: false,
    },
};

const shoppingCartOutRel: Partial<typeof sharedShoppingCartOutRel> = {};

export const shoppingCarts = () =>
    ecommerceApp.odm.setModel(
        "shoppingCart",
        shoppingCartPureObj,
        shoppingCartInRel as Record<string, InRelation>,
        shoppingCartOutRel as Record<string, OutRelation>,
    );
