import { ecommerceApp } from "../../../mod.ts";
import { addCityFn } from "./addCity.fn.ts";
import { addCityValidator } from "./addCity.val.ts";

export const addCitySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "city",
        fn: addCityFn,
        actName: "addCity",
        validator: addCityValidator(),
    });
