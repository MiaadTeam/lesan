import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getFileFn } from "./getFile.fn.ts";
import { getFileValidator } from "./getFile.val.ts";

export const getFileSetup = () =>
  coreApp.acts.setAct({
    schema: "file",
    actName: "getFile",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getFileValidator(),
    fn: getFileFn,
  });
