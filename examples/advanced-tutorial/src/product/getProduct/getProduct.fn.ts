import { type ActFn, ObjectId } from "lesan";
import { product } from "../../../mod.ts";
import { throwError } from "@lib";

export const getProductFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const foundedProduct = await product.findOne({
    filters: { _id: new ObjectId(_id as string) },
    projection: get,
  });

  !foundedProduct && throwError("product not found");
  return foundedProduct;
};
