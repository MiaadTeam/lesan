import { type ActFn, type Document, ObjectId } from "lesan";
import { inventory } from "../../../mod.ts";

export const getInventoriesFn: ActFn = async (body) => {
  const {
    set: { storeId, productId },
    get,
  } = body.details;

  const filters: Document = {};
  storeId && (filters["store._id"] = new ObjectId(storeId as string));
  productId && (filters["product._id"] = new ObjectId(productId as string));

  return await inventory
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { quantity: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
