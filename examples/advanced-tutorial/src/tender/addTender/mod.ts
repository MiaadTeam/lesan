import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addTenderFn } from "./addTender.fn.ts";
import { addTenderValidator } from "./addTender.val.ts";

export const addTenderSetup = () =>
  coreApp.acts.setAct({
    schema: "tender",
    actName: "addTender",
    validationRunType: "create",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead"], features: ["canCreateTender"] },
      ]),
    ],
    validator: addTenderValidator(),
    fn: addTenderFn,
  });
