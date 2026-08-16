import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateUnitRelationsFn } from "./updateUnitRelations.fn.ts";
import { updateUnitRelationsValidator } from "./updateUnitRelations.val.ts";

export const updateUnitRelationsSetup = () =>
  coreApp.acts.setAct({
    schema: "unit",
    actName: "updateUnitRelations",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin", "OrgHead"] }])],
    validator: updateUnitRelationsValidator(),
    fn: updateUnitRelationsFn,
  });
