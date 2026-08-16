import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { awardFn } from "./award.fn.ts";
import { awardValidator } from "./award.val.ts";

export const awardSetup = () =>
  coreApp.acts.setAct({
    schema: "tender",
    actName: "award",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["UnitHead"], features: ["canCreateTender"] },
      ]),
    ],
    validator: awardValidator(),
    fn: awardFn,
  });
