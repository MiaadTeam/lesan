import { addStateSetup } from "./addState/mod.ts";
import { getStateSetup } from "./getState/mod.ts";
import { updateStateSetup } from "./updateState/mod.ts";

export const stateSetup = () => {
    addStateSetup();
    updateStateSetup();
    getStateSetup();
};
