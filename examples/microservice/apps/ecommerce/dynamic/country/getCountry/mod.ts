import { ecommerceApp } from "../../../mod.ts";
import { getCountryFn } from "./getCountry.fn.ts";
import { getCountryValidator } from "./getCountry.val.ts";

export const getCountrySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "country",
        fn: getCountryFn,
        actName: "getCountry",
        validator: getCountryValidator(),
    });
