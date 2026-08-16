import { type ActFn, type Document, ObjectId } from "lesan";
import { stockMovement } from "../../../mod.ts";

export const getStockMovementsFn: ActFn = async (body) => {
  const {
    set: { storeId, productId, reason },
    get,
  } = body.details;

  const filters: Document = {};
  storeId && (filters["store._id"] = new ObjectId(storeId as string));
  productId && (filters["product._id"] = new ObjectId(productId as string));
  reason && (filters.reason = reason as string);

  return await stockMovement
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { createdAt: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
