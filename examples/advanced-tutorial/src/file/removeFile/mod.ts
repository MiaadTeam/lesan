import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { removeFileFn } from "./removeFile.fn.ts";
import { removeFileValidator } from "./removeFile.val.ts";

export const removeFileSetup = () =>
  coreApp.acts.setAct({
    schema: "file",
    actName: "removeFile",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: removeFileValidator(),
    fn: removeFileFn,
  });
