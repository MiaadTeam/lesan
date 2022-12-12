import { ecommerceApp } from "../../../mod.ts";
import { getCityFn } from "./getCity.fn.ts";
import { getCityValidator } from "./getCity.val.ts";

export const getCitySetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "city",
        fn: getCityFn,
        actName: "getCity",
        validator: getCityValidator(),
    });
