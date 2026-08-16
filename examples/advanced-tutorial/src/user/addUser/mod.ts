import {
  grantAccess,
  setTokens,
  setUser,
} from "@lib";
import { coreApp } from "../../../mod.ts";
import { addUserFn } from "./addUser.fn.ts";
import { addUserValidator } from "./addUser.val.ts";

export const addUserSetup = () =>
  coreApp.acts.setAct({
    schema: "user",
    actName: "addUser",
    validationRunType: "create",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        {
          roles: ["OrgHead"],
          getScope: (b) => {
            const orgs = b?.details?.set?.organizations as string[] | undefined;
            return orgs?.[0]
              ? { scopeType: "organization", scopeId: orgs[0] }
              : null;
          },
        },
      ]),
    ],
    validator: addUserValidator(),
    fn: addUserFn,
  });
