import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    invoiceInRel as sharedInvoiceInRel,
    invoiceOutRel as sharedInvoiceOutrel,
    pureInvoiceObj as sharedPureInvoiceObj,
} from "../../shared/mod.ts";

const invoicePureObj: Partial<typeof sharedPureInvoiceObj> = {
    _id: optional(any()),
    totalPrice: number(),
    totalQuantity: number(),
    discount: number(),
};

const invoiceInRel: Partial<typeof sharedInvoiceInRel> = {
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

const invoiceOutRel: Partial<typeof sharedInvoiceOutrel> = {};

export const invoices = () =>
    ecommerceApp.odm.setModel(
        "invoice",
        invoicePureObj,
        invoiceInRel as Record<string, InRelation>,
        invoiceOutRel as Record<string, OutRelation>,
    );
