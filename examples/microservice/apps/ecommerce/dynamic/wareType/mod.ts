import { addWareTypeSetup } from "./addWareType/mod.ts";
import { updateWareTypeSetup } from "./updateWareType/mod.ts";

export * from "./addWareType/mod.ts";
export * from "./updateWareType/mod.ts";

export const wareTypeSetup = () => {
  addWareTypeSetup();
  updateWareTypeSetup();
};
