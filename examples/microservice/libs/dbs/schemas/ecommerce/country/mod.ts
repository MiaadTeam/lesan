import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import {
  any,
  array,
  InRelation,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "../../../deps.ts";

import {
  countryInRel as sharedCountryInRel,
  countryOutRel as sharedCountryOutRel,
  pureCountryObj as sharedPureCountryObj,
} from "../../shared/mod.ts";

const countryPureObj: Partial<typeof sharedPureCountryObj> = {
  _id: optional(any()),
  name: string(),
  enName: optional(string()),
  countryCode: optional(array(string())),
  geometries: optional(object({
    type: string(),
    coordinates: array(array(number())),
  })),
};

const countryInRel: Partial<typeof sharedCountryInRel> = {};

const countryOutRel: Partial<typeof sharedCountryOutRel> = {
  states: {
    schemaName: "state",
    number: 50,
    sort: { type: "objectId", field: "_id", order: "desc" },
  },
  users: {
    schemaName: "user",
    number: 50,
    sort: { type: "objectId", field: "_id", order: "desc" },
  },
};

export const countries = () =>
  ecommerceApp.odm.setModel(
    "country",
    countryPureObj,
    countryInRel as Record<string, InRelation>,
    countryOutRel as Record<string, OutRelation>,
  );
