import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateUserRelationsFn } from "./updateUserRelations.fn.ts";
import { updateUserRelationsValidator } from "./updateUserRelations.val.ts";

export const updateUserRelationsSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "updateUserRelations",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: updateUserRelationsValidator(),
    fn: updateUserRelationsFn,
  });
