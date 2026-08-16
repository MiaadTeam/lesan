import { type ActFn } from "lesan";
import { createToken } from "@lib";
import { user } from "../../../mod.ts";
import { comparePassword } from "@lib";
import { throwError } from "@lib";

export const loginUserFn: ActFn = async (body) => {
  const {
    set: { password, email },
    get,
  } = body.details;

  const createTokenForUser = async (user: any) => {
    const token = await createToken({
      _id: user._id,
      email: user.email,
      roles: user.roles,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 90,
    });
    return { token, user };
  };

  get.user.email = 1;
  get.user.password = 1;
  get.user.roles = 1;

  const foundedUser = await user.findOne({
    filters: { email },
    projection: get.user,
  });

  if (!foundedUser) {
    throwError("This user does not exist at all!");
  }

  const passIsCorrect = await comparePassword(password, foundedUser!.password);

  if (passIsCorrect) {
    delete foundedUser!.password;
    return await createTokenForUser(foundedUser);
  } else {
    throwError("Your password is incorrect!");
  }
};
