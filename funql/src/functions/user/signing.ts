
import { users, Level, userSelectable } from "../../schemas/user.ts";
import type { User, RUser } from "../../schemas/user.ts";
import { createVerificationCode, throwError } from "../../utils/index.ts";
import { redis } from "../../../config/index.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          phone: { type: "number" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: userSelectable(),
      },
    },
  },
});

interface SigningDetails {
  set: { phone: number };
  get: RUser;
}

type Signing = (details: SigningDetails) => Promise<Partial<User>>;

export const signing: Signing = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { phone },
  } = details;
  const foundedUser = (await users.findOne({ phone })) || {
    _id: await users.insertOne({
      phone,
      isActive: false,
      level: [Level.Normal],
    }),
    phone,
  };

  const code = createVerificationCode();
  await redis.set(`reg-${foundedUser.phone}`, code, {
    ex: 100,
  });
  return { phone: foundedUser.phone };
};
