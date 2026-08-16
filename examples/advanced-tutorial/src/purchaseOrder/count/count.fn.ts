import { type ActFn, type Document, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";

export const countFn: ActFn = async (body) => {
  const {
    set: { status, organizationId, requestingUnitId },
  } = body.details;

  const filters: Document = {};
  status && (filters.status = status as string);
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));
  requestingUnitId && (filters["requestingUnit._id"] = new ObjectId(requestingUnitId as string));

  const [count] = await purchaseOrder
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $count: "count" },
      ] as Document[],
    })
    .toArray();

  return { count: count?.count || 0 };
};
