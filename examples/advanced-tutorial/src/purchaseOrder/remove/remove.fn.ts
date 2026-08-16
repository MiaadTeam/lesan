import { type ActFn, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const removed = await purchaseOrder.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("purchase order not found");
  return removed;
};
