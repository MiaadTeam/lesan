import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getFilesFn } from "./getFiles.fn.ts";
import { getFilesValidator } from "./getFiles.val.ts";

export const getFilesSetup = () =>
  coreApp.acts.setAct({
    schema: "file",
    actName: "getFiles",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getFilesValidator(),
    fn: getFilesFn,
  });
