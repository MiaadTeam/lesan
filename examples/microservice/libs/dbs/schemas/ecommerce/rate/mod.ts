import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    pureRateObj as sharedPureRateObj,
    Rate,
    rateInRel as sharedRateInRel,
    rateOutRel as sharedRateOutrel,
} from "../../shared/mod.ts";

const ratePureObj: Partial<typeof sharedPureRateObj> = {
    _id: optional(any()),
    totalRate: number(),
    rates: array(object({
        userId: string(),
        rate: Rate,
    })),
};

const rateInRel: Partial<typeof sharedRateInRel> = {
    ware: {
        schemaName: "ware",
        type: "one",
        optional: false,
    },
};

const rateOutRel: Partial<typeof sharedRateOutrel> = {};

export const rates = () =>
    ecommerceApp.odm.setModel(
        "rate",
        ratePureObj,
        rateInRel as Record<string, InRelation>,
        rateOutRel as Record<string, OutRelation>,
    );
