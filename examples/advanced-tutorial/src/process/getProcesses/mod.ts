import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getProcessesFn } from "./getProcesses.fn.ts";
import { getProcessesValidator } from "./getProcesses.val.ts";

export const getProcessesSetup = () =>
  coreApp.acts.setAct({
    schema: "process",
    actName: "getProcesses",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee"] }])],
    validator: getProcessesValidator(),
    fn: getProcessesFn,
  });
