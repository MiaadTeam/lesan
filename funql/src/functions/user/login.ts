
import { RUser, User, users } from "../../schemas/user.ts";
import { create, Payload } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { redis } from "../../../config/index.ts";
import { throwError } from "../../utils/throwErr.ts";

export const key = "your-secret";

export const payload: Payload = {
  // six month credit time
  exp: Date.now() / 1000 + 60 * 60 * 24 * 30 * 6,
};

interface LoginInputs {
  set: {
    phone: number;
    code: number;
  };
  get: RUser;
}

type Login = (details: LoginInputs) => Promise<Partial<User>>;

export const login: Login = async ({ set: { phone, code } }) => {
  const createToken = async (user: User) => {
    payload.usersId = user._id;
    user.isActive &&
      (await users.updateOne({ _id: user._id }, { $set: { isActive: true } }));
    return {
      ...user,
      token: await create({ alg: "HS512", typ: "JWT" }, payload, key),
    };
  };

  const verifyCode = async (code: number, user: User) => {
    const getCode = await redis.get(`reg-${user.phone}`);
    return code === Number(getCode)
      ? await createToken(user)
      : throwError("your code is not correct");
  };

  const getUser = await users.findOne({ phone });
  return getUser
    ? await verifyCode(code, getUser)
    : throwError("user not found");
};
