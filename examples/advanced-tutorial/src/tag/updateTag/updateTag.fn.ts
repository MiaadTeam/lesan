import { type ActFn, ObjectId } from "lesan";
import { tag } from "../../../mod.ts";
import { throwError } from "@lib";

export const updateTagFn: ActFn = async (body) => {
  const {
    set: { _id, ...rest },
    get,
  } = body.details;

  const updated = await tag.findOneAndUpdate({
    filter: { _id: new ObjectId(_id as string) },
    update: { $set: rest },
    projection: get,
  });

  !updated && throwError("tag not found");
  return updated;
};
