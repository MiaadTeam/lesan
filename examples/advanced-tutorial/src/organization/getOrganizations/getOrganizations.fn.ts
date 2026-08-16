import { type ActFn, type Document } from "lesan";
import { organization } from "../../../mod.ts";

export const getOrganizationsFn: ActFn = async (body) => {
  const {
    set: { name },
    get,
  } = body.details;

  const filters: Document = {};
  name && (filters.name = { $regex: name as string, $options: "i" });

  return await organization
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { name: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
