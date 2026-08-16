import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { updateProductRelationsFn } from "./updateProductRelations.fn.ts";
import { updateProductRelationsValidator } from "./updateProductRelations.val.ts";

export const updateProductRelationsSetup = () =>
  coreApp.acts.setAct({
    schema: "product",
    actName: "updateProductRelations",
    preAct: [setTokens, setUser, grantAccess([{ roles: ["Manager", "Admin"] }])],
    validator: updateProductRelationsValidator(),
    fn: updateProductRelationsFn,
  });
