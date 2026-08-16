import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { getOrganizationsFn } from "./getOrganizations.fn.ts";
import { getOrganizationsValidator } from "./getOrganizations.val.ts";

export const getOrganizationsSetup = () =>
  coreApp.acts.setAct({
    schema: "organization",
    actName: "getOrganizations",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead", "UnitHead", "Employee", "Ordinary"] }])],
    validator: getOrganizationsValidator(),
    fn: getOrganizationsFn,
  });
