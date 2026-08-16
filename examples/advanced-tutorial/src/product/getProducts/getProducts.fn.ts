import { type ActFn, type Document, ObjectId } from "lesan";
import { product } from "../../../mod.ts";

export const getProductsFn: ActFn = async (body) => {
  const {
    set: { search, tagId },
    get,
  } = body.details;

  const filters: Document = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search as string, $options: "i" } },
      { code: { $regex: search as string, $options: "i" } },
    ];
  }
  tagId && (filters["tags._id"] = new ObjectId(tagId as string));

  return await product
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { name: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
