import { any, enums, InRelation, number, optional, string } from "../../../deps.ts";

export const OrderStatus = enums(["REJECT", "PROCESSING", "DELIVERED", "CANCELED"]);

export const PaymentStatus = enums(["PAID", "NOTPAID"]);

export const pureOrderObj = {
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

export const orderInRel: Record<string, InRelation> = {
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

export const orderOutRel = {};
