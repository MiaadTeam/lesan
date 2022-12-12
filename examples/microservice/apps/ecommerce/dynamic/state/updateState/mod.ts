import { ecommerceApp } from "../../../mod.ts";
import { updateStateFn } from "./updateState.fn.ts";
import { updateStateValidator } from "./updateState.val.ts";

export const updateStateSetup = () =>
    ecommerceApp.acts.setAct({
        type: "dynamic",
        schema: "state",
        fn: updateStateFn,
        actName: "updateState",
        validator: updateStateValidator(),
    });
