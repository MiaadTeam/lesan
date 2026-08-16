import { addOrganizationSetup } from "./addOrganization/mod.ts";
import { getOrganizationsSetup } from "./getOrganizations/mod.ts";
import { updateOrganizationRelationsSetup } from "./updateOrganizationRelations/mod.ts";

export const organizationSetup = () => {
  addOrganizationSetup();
  getOrganizationsSetup();
  updateOrganizationRelationsSetup();
};
