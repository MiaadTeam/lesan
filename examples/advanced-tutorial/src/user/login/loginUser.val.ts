import { object, optional, size, string } from "lesan";
import { selectStruct } from "../../../mod.ts";
import { emailPattern } from "@model";

export const loginUserValidator = () => {
  return object({
    set: object({
      email: emailPattern,
      password: size(string(), 8, 100),
    }),
    get: optional(
      object({
        token: optional(size(string(), 1, 1000)),
        user: selectStruct("user", 1),
      }),
    ),
  });
};
