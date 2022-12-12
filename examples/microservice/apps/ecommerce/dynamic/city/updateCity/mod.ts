import { ecommerceApp } from "../../../mod.ts";
import { updateCityFn } from "./updateCity.fn.ts";
import { updateCityValidator } from "./updateCity.val.ts";

export const updateCitySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "city",
        fn: updateCityFn,
        actName: "updateCity",
        validator: updateCityValidator(),
    });
