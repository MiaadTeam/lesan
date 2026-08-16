import { type ActFn, type Document, ObjectId } from "lesan";
import { budgetLine } from "../../../mod.ts";

export const getBudgetLinesFn: ActFn = async (body) => {
  const {
    set: { organizationId, year },
    get,
  } = body.details;

  const filters: Document = {};
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));
  year && (filters.year = Number(year));

  return await budgetLine
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { year: -1, code: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
