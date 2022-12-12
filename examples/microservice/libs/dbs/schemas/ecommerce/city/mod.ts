import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";

import {
    cityInRel as sharedCityInRel,
    cityOutRel as sharedCityOutRel,
    pureCityObj as sharedPureCityObj,
} from "../../shared/mod.ts";

const cityPureObj: Partial<typeof sharedPureCityObj> = {
    name: string(),
    enName: optional(string()),
    geometries: optional(object({
        type: string(),
        coordinates: array(array(number())),
    })),
};

const cityInRel: Partial<typeof sharedCityInRel> = {
    state: {
        schemaName: "state",
        type: "one",
        optional: false,
    },
};

const cityOutRel: Partial<typeof sharedCityOutRel> = {
    users: {
        schemaName: "user",
        number: 50,
        sort: { type: "objectId", field: "_id", order: "desc" },
    },
};

export const cities = () =>
    ecommerceApp.odm.setModel(
        "city",
        cityPureObj,
        cityInRel as Record<string, InRelation>,
        cityOutRel as Record<string, OutRelation>,
    );
