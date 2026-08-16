import { type ActFn, type Document, ObjectId } from "lesan";
import { stepApproval } from "../../../mod.ts";

export const getPendingByUnitFn: ActFn = async (body) => {
  const {
    set: { unitId },
    get,
  } = body.details;

  const filters: Document = {
    "unit._id": new ObjectId(unitId as string),
    status: "pending",
  };

  return await stepApproval
    .aggregation({
      pipeline: [
        { $match: filters },
        { $sort: { createdAt: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
