import { coreApp } from "../mod.ts";
import { throwError } from "./throwError.ts";
import { verifyToken } from "./jwt.ts";

export const setTokens = async () => {
  const { Headers } = coreApp.contextFns.getContextModel();
  const token = Headers.get("token");

  if (!token) {
    throwError("you should send your id with token key in req header");
  }

  try {
    const verifiedUser = await verifyToken(token as string);
    coreApp.contextFns.setContext({ user: verifiedUser });
  } catch (_e) {
    throwError("Invalid or expired token");
  }
};
