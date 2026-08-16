import { type ActFn, type Document, ObjectId } from "lesan";
import { process } from "../../../mod.ts";

export const getProcessesFn: ActFn = async (body) => {
  const {
    set: { organizationId, status },
    get,
  } = body.details;

  const filters: Document = {};
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));
  status && (filters.status = status as string);

  return await process
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { createdAt: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
