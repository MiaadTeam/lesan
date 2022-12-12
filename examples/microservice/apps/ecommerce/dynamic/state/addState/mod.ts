import { ecommerceApp } from "../../../mod.ts";
import { addStateFn } from "./addState.fn.ts";
import { addStateValidator } from "./addState.val.ts";

export const addStateSetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "state",
        fn: addStateFn,
        actName: "addState",
        validator: addStateValidator(),
    });
