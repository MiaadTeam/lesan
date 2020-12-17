import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";
import { createLoginContent } from "./login.ts";
import { createSingingContent } from "./signing.ts";

const content = `
import { login } from "./login.ts";
import { User } from "../../schemas/user.ts";
import { throwError } from "../../utils/throwErr.ts";
import { signing } from "./signing.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["signing", "login"],
  },
});

export type UserDoit = "signing" | "login";

type UsrFns = (doit: UserDoit, details: any) => Promise<Partial<User>>;

export const usrFns: UsrFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["signing"]: async () => await signing(details),
        ["login"]: async () => await login(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
`;

export const createUsrIndexContent = async (init: string) => {
  init = `${init}/user`;
  await ensureDir(init);

  await createLoginContent(init);
  await createSingingContent(init);

  await Deno.writeTextFile(`${init}/index.ts`, content);
};
