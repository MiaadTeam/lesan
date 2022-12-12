import { ecommerceApp } from "../../../mod.ts";
import { getStateFn } from "./getState.fn.ts";
import { getStateValidator } from "./getState.val.ts";

export const getStateSetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "state",
        fn: getStateFn,
        actName: "getState",
        validator: getStateValidator(),
    });
