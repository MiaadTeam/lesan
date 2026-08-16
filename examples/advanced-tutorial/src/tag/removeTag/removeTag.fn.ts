import { type ActFn, ObjectId } from "lesan";
import { tag } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeTagFn: ActFn = async (body) => {
  const {
    set: { _id },
  } = body.details;

  const removed = await tag.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("tag not found");
  return removed;
};
