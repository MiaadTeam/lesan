import { addStoreSetup } from "./addStore/mod.ts";
import { getStoresSetup } from "./getStores/mod.ts";

export const storeSetup = () => {
  addStoreSetup();
  getStoresSetup();
};
