import { addProductSetup } from "./addProduct/mod.ts";
import { getProductsSetup } from "./getProducts/mod.ts";
import { getProductSetup } from "./getProduct/mod.ts";
import { updateProductRelationsSetup } from "./updateProductRelations/mod.ts";
import { removeProductSetup } from "./removeProduct/mod.ts";

export const productSetup = () => {
  addProductSetup();
  getProductsSetup();
  getProductSetup();
  updateProductRelationsSetup();
  removeProductSetup();
};
