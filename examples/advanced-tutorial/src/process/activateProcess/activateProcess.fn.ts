import { type ActFn, ObjectId } from "lesan";
import { process, processStep } from "../../../mod.ts";
import { throwError } from "@lib";

export const activateProcessFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const processId = new ObjectId(_id as string);

  const foundedProcess = await process.findOne({
    filters: { _id: processId },
    projection: { _id: 1, status: 1, steps: { _id: 1 } },
  });

  !foundedProcess && throwError("process not found");

  if (foundedProcess!.status === "Active") {
    throwError("process is already active");
  }

  const stepsCount = await processStep
    .aggregation({
      pipeline: [
        { $match: { "process._id": processId } },
        { $count: "count" },
      ],
    })
    .toArray();

  const count = stepsCount[0]?.count || 0;
  if (count === 0) {
    throwError("cannot activate a process without steps");
  }

  return await process.findOneAndUpdate({
    filter: { _id: processId },
    update: { $set: { status: "Active", isActive: true } },
    projection: get,
  });
};
