import { type ActFn, type Document, ObjectId } from "lesan";
import { unit } from "../../../mod.ts";

export const getUnitsFn: ActFn = async (body) => {
  const {
    set: { organizationId },
    get,
  } = body.details;

  const filters: Document = {};
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));

  return await unit
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { name: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
