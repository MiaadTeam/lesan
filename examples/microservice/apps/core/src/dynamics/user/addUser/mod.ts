export * from "./addUser.fn.ts";
export * from "./addUser.val.ts";

import { coreApp } from "../../../../mod.ts";
import { addUserFn } from "./addUser.fn.ts";
import { addUserValidator } from "./addUser.val.ts";
export const addUserSetup = () =>
    coreApp.acts.setAct({
        type: "dynamic",
        schema: "user",
        fn: addUserFn,
        actName: "addUser",
        validator: addUserValidator(),
    });
