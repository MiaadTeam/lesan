import { type ActFn, ObjectId } from "lesan";
import { user } from "../../../mod.ts";
import { hashPassword } from "@lib";
import { throwError } from "@lib";

export const updateUserFn: ActFn = async (body) => {
  const {
    set: { _id, password, ...rest },
    get,
  } = body.details;

  const userId = new ObjectId(_id as string);

  const update = { $set: { ...rest } } as Record<string, unknown>;
  if (password) {
    update.$set = { ...(update.$set as Record<string, unknown>), password: await hashPassword(password as string) };
  }

  const updated = await user.findOneAndUpdate({
    filter: { _id: userId },
    update,
    projection: get,
  });

  !updated && throwError("user not found");
  return updated;
};
