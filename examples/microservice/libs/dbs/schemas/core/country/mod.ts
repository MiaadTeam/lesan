import { coreApp } from "../../../../../apps/core/mod.ts";
import db from "../../../db.ts";
import {
  array,
  Infer,
  number,
  object,
  optional,
  OutRelation,
  string,
} from "../../../deps.ts";
import {
  countryOutRel as sharedCountryOutRel,
  pureCountryObj as sharedPureCountryObj,
} from "../../shared/mod.ts";

const countryPureObj: Partial<typeof sharedPureCountryObj> = {
  name: string(),
  enName: optional(string()),
  countryCode: optional(array(string())),
  geometries: optional(object({
    type: string(),
    coordinates: array(array(number())),
  })),
};

const countryInRel = {};

const outRelCountry: Partial<typeof sharedCountryOutRel> = {
  user: {
    schemaName: "user",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};

// coreApp.schemas.addPureModel("country", countryPureObj);
//
// coreApp.schemas.addOutRelations({
//   schemaName: "country",
//   outrelation: outRelCountry as Record<string, OutRelation>,
// });
//
// coreApp.schemas.addInrelations({
//   schemaName: "country",
//   inrelation: countryInRel,
// });

export const countries = () =>
  coreApp.odm.setModel(
    "country",
    countryPureObj,
    countryInRel,
    outRelCountry as Record<string, OutRelation>,
  );
