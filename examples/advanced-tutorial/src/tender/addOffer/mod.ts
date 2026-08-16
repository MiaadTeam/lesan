import { grantAccess, setTokens, setUser } from "@lib";
import { coreApp } from "../../../mod.ts";
import { addOfferFn } from "./addOffer.fn.ts";
import { addOfferValidator } from "./addOffer.val.ts";

export const addOfferSetup = () =>
  coreApp.acts.setAct({
    schema: "tender",
    actName: "addOffer",
    preAct: [
      setTokens,
      setUser,
      grantAccess([
        { roles: ["Manager", "Admin"] },
        { roles: ["Employee", "Ordinary", "UnitHead"], features: ["canRespondToTender"] },
      ]),
    ],
    validator: addOfferValidator(),
    fn: addOfferFn,
  });
