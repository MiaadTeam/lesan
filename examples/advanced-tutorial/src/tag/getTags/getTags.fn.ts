import { type ActFn, type Document } from "lesan";
import { tag } from "../../../mod.ts";

export const getTagsFn: ActFn = async (body) => {
  const { get } = body.details;

  return await tag
    .aggregation({
      pipeline: [
        { $sort: { createdAt: -1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
