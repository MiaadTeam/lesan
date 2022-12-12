import { addUserSetup } from "./addUser/mod.ts";

export * from "./addUser/mod.ts";

export const userSetup = () => {
    addUserSetup();
};
