import { type ActFn, ObjectId } from "lesan";
import { user } from "../../../mod.ts";
import { throwError } from "@lib";

export const removeUserFn: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;

  const removed = await user.deleteOne({
    filter: { _id: new ObjectId(_id as string) },
  });

  !removed && throwError("user not found");
  return removed;
};
