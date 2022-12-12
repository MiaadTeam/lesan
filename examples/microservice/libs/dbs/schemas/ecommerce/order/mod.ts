import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, InRelation, number, optional, string } from "../../../deps.ts";

import {
    orderInRel as sharedOrderInRel,
    OrderStatus,
    PaymentStatus,
    pureOrderObj as sharedPureOrderObj,
} from "../../shared/mod.ts";

const orderPureObj: Partial<typeof sharedPureOrderObj> = {
    _id: optional(any()),
    totalPrice: number(),
    totalQuantity: number(),
    confirmationNumber: number(),
    discount: number(),
    description: string(),
    discountCode: optional(string()),
    paymentStatus: PaymentStatus,
    orderStatus: OrderStatus,
};

const orderInRel: Partial<typeof sharedOrderInRel> = {
    user: {
        schemaName: "user",
        type: "one",
        optional: false,
    },
    shop: {
        schemaName: "shop",
        type: "one",
        optional: false,
    },
};

const orderOutRel = {};

export const orders = () =>
    ecommerceApp.odm.setModel(
        "order",
        orderPureObj,
        orderInRel as Record<string, InRelation>,
        orderOutRel,
    );
