import { type ActFn, ObjectId } from "lesan";
import { unit } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeUnitFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const removed = await unit.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("unit not found");
  return removed;
};
