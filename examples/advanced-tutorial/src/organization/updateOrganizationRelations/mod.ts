import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateOrganizationRelationsFn } from "./updateOrganizationRelations.fn.ts";
import { updateOrganizationRelationsValidator } from "./updateOrganizationRelations.val.ts";

export const updateOrganizationRelationsSetup = () =>
  coreApp.acts.setAct({
    schema: "organization",
    actName: "updateOrganizationRelations",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead"] }])],
    validator: updateOrganizationRelationsValidator(),
    fn: updateOrganizationRelationsFn,
  });
