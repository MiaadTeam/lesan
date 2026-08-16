import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { uploadFileFn } from "./uploadFile.fn.ts";
import { uploadFileValidator } from "./uploadFile.val.ts";

export const uploadFileSetup = () =>
  coreApp.acts.setAct({
    schema: "file",
    fn: uploadFileFn,
    actName: "uploadFile",
    preAct: [
      setTokens,
      setUser,
      grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }]),
    ],
    validator: uploadFileValidator(),
  });
