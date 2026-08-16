import { type ActFn, ObjectId, type Document } from "lesan";
import { file } from "../../../mod.ts";

export const getFilesFn: ActFn = async (body) => {
  const {
    set: { uploaderId },
    get,
  } = body.details;

  const filters: Document = {};
  uploaderId && (filters["uploader._id"] = new ObjectId(uploaderId as string));

  return await file
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { createdAt: -1 } },
      ],
      projection: get,
    })
    .toArray();
};
