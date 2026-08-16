import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addOrganizationFn } from "./addOrganization.fn.ts";
import { addOrganizationValidator } from "./addOrganization.val.ts";

export const addOrganizationSetup = () =>
  coreApp.acts.setAct({
    schema: "organization",
    actName: "addOrganization",
    validationRunType: "create",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: addOrganizationValidator(),
    fn: addOrganizationFn,
  });
