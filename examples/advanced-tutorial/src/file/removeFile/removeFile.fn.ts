import { type ActFn, ObjectId } from "lesan";
import { file } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeFileFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const removed = await file.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("file not found");
  return removed;
};
