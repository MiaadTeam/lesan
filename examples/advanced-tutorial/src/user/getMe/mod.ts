import { setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getMeFn } from "./getMe.fn.ts";
import { getMeValidator } from "./getMe.val.ts";

export const getMeSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    fn: getMeFn,
    actName: "getMe",
    preAct: [setTokens, setUser],
    validator: getMeValidator(),
  });
