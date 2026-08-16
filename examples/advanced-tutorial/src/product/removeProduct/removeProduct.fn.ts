import { type ActFn, ObjectId } from "lesan";
import { product } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeProductFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const removed = await product.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("product not found");
  return removed;
};
