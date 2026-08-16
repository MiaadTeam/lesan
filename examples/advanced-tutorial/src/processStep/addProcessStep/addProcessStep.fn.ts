import { type ActFn, type TInsertRelations, ObjectId } from "lesan";
import { processStep } from "../../../mod.ts";
import { stripActiveRole } from "@lib";
import type { processStep_relations } from "@model";

export const addProcessStepFn: ActFn = async (body) => {
  const { set, get } = body.details;
  const { process, ...rest } = stripActiveRole(set);

  const relations: TInsertRelations<typeof processStep_relations> = {
    process: {
      _ids: new ObjectId(process as string),
      relatedRelations: { steps: true },
    },
  };

  return await processStep.insertOne({
    doc: rest,
    relations,
    projection: get,
  });
};
