import { type ActFn, type Document, ObjectId } from "lesan";
import { store } from "../../../mod.ts";

export const getStoresFn: ActFn = async (body) => {
  const {
    set: { unitId },
    get,
  } = body.details;

  const filters: Document = {};
  unitId && (filters["unit._id"] = new ObjectId(unitId as string));

  return await store
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { name: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
