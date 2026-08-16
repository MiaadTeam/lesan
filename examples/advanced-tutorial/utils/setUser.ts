import { ObjectId } from "lesan";
import { coreApp, user } from "../mod.ts";
import type { MyContext } from "./context.ts";
import { throwError } from "./throwError.ts";

export const setUser = async () => {
  const ctx = coreApp.contextFns.getContextModel() as MyContext;
  const tokenUser = ctx.user;

  if (!tokenUser || !tokenUser._id) {
    throwError("Invalid or missing token data");
  }

  const userPureProjection = coreApp.schemas.createProjection("user", "Pure");

  const foundedUser = await user.findOne({
    filters: { _id: new ObjectId(tokenUser._id) },
    projection: {
      ...userPureProjection,
      organizations: { _id: 1 },
      units: { _id: 1 },
    },
  });

  !foundedUser && throwError("user not exist");

  coreApp.contextFns.setContext({ user: foundedUser });
};
