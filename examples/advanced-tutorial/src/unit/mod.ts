import { addUnitSetup } from "./addUnit/mod.ts";
import { getUnitsSetup } from "./getUnits/mod.ts";
import { updateUnitRelationsSetup } from "./updateUnitRelations/mod.ts";
import { removeUnitSetup } from "./removeUnit/mod.ts";

export const unitSetup = () => {
  addUnitSetup();
  getUnitsSetup();
  updateUnitRelationsSetup();
  removeUnitSetup();
};
