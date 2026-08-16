import { addStockSetup } from "./addStock/mod.ts";
import { removeStockSetup } from "./removeStock/mod.ts";
import { transferStockSetup } from "./transferStock/mod.ts";
import { getInventoriesSetup } from "./getInventories/mod.ts";
import { getStockLevelSetup } from "./getStockLevel/mod.ts";

export const inventorySetup = () => {
  addStockSetup();
  removeStockSetup();
  transferStockSetup();
  getInventoriesSetup();
  getStockLevelSetup();
};
