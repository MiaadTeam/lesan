import { type ActFn, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";

export const getHistoryFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const po = await purchaseOrder.findOne({
    filters: { _id: new ObjectId(_id as string) },
    projection: { _id: 1, title: 1, history: get.history || {} },
  });

  !po && throwError("purchase order not found");

  return { _id: po!._id, title: (po as any).title, history: (po as any).history || [] };
};
