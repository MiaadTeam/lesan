import { ecommerceApp } from "../../../mod.ts";
import { deleteCountryFn } from "./deleteCountry.fn.ts";
import { deleteCountryValidator } from "./deleteCountry.val.ts";

export const deleteCountrySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "country",
        fn: deleteCountryFn,
        actName: "deleteCountry",
        validator: deleteCountryValidator(),
    });
