export * from "./addCountry.fn.ts";
export * from "./addCountry.val.ts";

import { coreApp } from "../../../../mod.ts";
import { addCountryFn } from "./addCountry.fn.ts";
import { addCountryValidator } from "./addCountry.val.ts";

export const addCountrySetup = () =>
  coreApp.acts.setAct({
    type: "dynamic",
    schema: "country",
    fn: addCountryFn,
    actName: "addCountry",
    validator: addCountryValidator(),
  });
