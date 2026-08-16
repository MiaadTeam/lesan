import { addTenderSetup } from "./addTender/mod.ts";
import { getTendersSetup } from "./getTenders/mod.ts";
import { addOfferSetup } from "./addOffer/mod.ts";
import { awardSetup } from "./award/mod.ts";

export const tenderSetup = () => {
  addTenderSetup();
  getTendersSetup();
  addOfferSetup();
  awardSetup();
};
