import { addSetup } from "./add/mod.ts";
import { getSetup } from "./get/mod.ts";
import { getsSetup } from "./gets/mod.ts";
import { countSetup } from "./count/mod.ts";
import { submitSetup } from "./submit/mod.ts";
import { cancelSetup } from "./cancel/mod.ts";
import { finalizeSetup } from "./finalize/mod.ts";
import { updateRelationsSetup } from "./updateRelations/mod.ts";
import { removeSetup } from "./remove/mod.ts";
import { getHistorySetup } from "./getHistory/mod.ts";

export const purchaseOrderSetup = () => {
  addSetup();
  getSetup();
  getsSetup();
  countSetup();
  submitSetup();
  cancelSetup();
  finalizeSetup();
  updateRelationsSetup();
  removeSetup();
  getHistorySetup();
};
