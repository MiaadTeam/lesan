import { type ActFn, type Document, ObjectId } from "lesan";
import { tender } from "../../../mod.ts";

export const getTendersFn: ActFn = async (body) => {
  const {
    set: { status, organizationId },
    get,
  } = body.details;

  const filters: Document = {};
  status && (filters.status = status as string);
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));

  return await tender
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { createdAt: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
