import { ecommerceApp } from "../../../mod.ts";
import { deleteCityFn } from "./deleteCity.fn.ts";
import { deleteCityValidator } from "./deleteCity.val.ts";

export const deleteCitySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "city",
        fn: deleteCityFn,
        actName: "deleteCity",
        validator: deleteCityValidator(),
    });
