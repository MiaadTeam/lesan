import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    pureStateObj as sharedPureStateObj,
    stateInRel as sharedStateInRel,
    stateOutRel as sharedStateOutRel,
} from "../../shared/mod.ts";

const statePureObj: Partial<typeof sharedPureStateObj> = {
    _id: optional(any()),
    name: string(),
    enName: optional(string()),
    geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
};

const stateInRel: Partial<typeof sharedStateInRel> = {
    country: {
        schemaName: "country",
        type: "one",
        optional: false,
    },
    cities: {
        schemaName: "city",
        type: "many",
        optional: true,
    },
};

const stateOutRel: Partial<typeof sharedStateOutRel> = {};

export const states = () =>
    ecommerceApp.odm.setModel(
        "state",
        statePureObj,
        stateInRel as Record<string, InRelation>,
        stateOutRel as Record<string, OutRelation>,
    );
