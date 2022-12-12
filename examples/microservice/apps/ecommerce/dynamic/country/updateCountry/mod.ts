import { ecommerceApp } from "../../../mod.ts";
import { updateCountryFn } from "./updateCountry.fn.ts";
import { updateCountryValidator } from "./updateCountry.val.ts";

export const updateCountrySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "country",
        fn: updateCountryFn,
        actName: "updateCountry",
        validator: updateCountryValidator(),
    });
