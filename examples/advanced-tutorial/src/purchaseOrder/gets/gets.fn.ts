import { type ActFn, type Document, ObjectId } from "lesan";
import { purchaseOrder } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
  const {
    set: { search, status, organizationId, requestingUnitId, requesterId, page, limit, skip },
    get,
  } = body.details;

  const filters: Document = {};

  if (search) {
    filters.$text = { $search: search as string };
  }
  status && (filters.status = status as string);
  organizationId && (filters["organization._id"] = new ObjectId(organizationId as string));
  requestingUnitId && (filters["requestingUnit._id"] = new ObjectId(requestingUnitId as string));
  requesterId && (filters["requester._id"] = new ObjectId(requesterId as string));

  const pageNumber = page as number || 1;
  const limitNumber = limit as number || 50;
  const skipNumber = (skip as number) ?? (pageNumber - 1) * limitNumber;

  const [items, total] = await Promise.all([
    purchaseOrder
      .aggregation({
        pipeline: [
          ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
          { $sort: { createdAt: -1 } },
          { $skip: skipNumber },
          { $limit: limitNumber },
        ] as Document[],
        projection: get,
      })
      .toArray(),
    purchaseOrder.aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $count: "total" },
      ],
    }).toArray(),
  ]);

  return {
    items,
    total: total[0]?.total || 0,
    page: pageNumber,
    limit: limitNumber,
  };
};
