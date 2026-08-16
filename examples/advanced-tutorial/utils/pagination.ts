import { defaulted, number, optional } from "lesan";

export const pagination = {
  page: optional(defaulted(number(), () => 1)),
  limit: optional(defaulted(number(), () => 50)),
  skip: optional(number()),
};
