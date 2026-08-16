import { type ActFn, ObjectId } from "lesan";
import { coreApp, user } from "../../../mod.ts";
import { type MyContext, throwError } from "@lib";

export const getMeFn: ActFn = async (body) => {
  const context: MyContext = coreApp.contextFns.getContextModel() as MyContext;
  const _id = context.user._id;

  const { get } = body.details;

  const foundedUser = await user
    .aggregation({
      pipeline: [{ $match: { _id: new ObjectId(_id) } }],
      projection: get,
    })
    .toArray();
  foundedUser.length < 1 && throwError("user not exist");
  return foundedUser[0];
};
