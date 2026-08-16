import { type ActFn, type Document, ObjectId } from "lesan";
import { stepApproval } from "../../../mod.ts";

export const getStepApprovalsFn: ActFn = async (body) => {
  const {
    set: { purchaseOrderId },
    get,
  } = body.details;

  const filters: Document = {
    "purchaseOrder._id": new ObjectId(purchaseOrderId as string),
  };

  return await stepApproval
    .aggregation({
      pipeline: [
        { $match: filters },
        { $sort: { createdAt: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
