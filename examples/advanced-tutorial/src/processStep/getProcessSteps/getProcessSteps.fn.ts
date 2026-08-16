import { type ActFn, type Document, ObjectId } from "lesan";
import { processStep } from "../../../mod.ts";

export const getProcessStepsFn: ActFn = async (body) => {
  const {
    set: { processId },
    get,
  } = body.details;

  const filters: Document = {};
  processId && (filters["process._id"] = new ObjectId(processId as string));

  return await processStep
    .aggregation({
      pipeline: [
        ...(Object.keys(filters).length > 0 ? [{ $match: filters }] : []),
        { $sort: { order: 1 } },
      ] as Document[],
      projection: get,
    })
    .toArray();
};
