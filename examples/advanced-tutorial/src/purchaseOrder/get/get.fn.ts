import { type ActFn, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";
import { throwError } from "@lib";

export const getFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const foundedPO = await purchaseOrder.findOne({
    filters: { _id: new ObjectId(_id as string) },
    projection: get,
  });

  !foundedPO && throwError("purchase order not found");
  return foundedPO;
};
