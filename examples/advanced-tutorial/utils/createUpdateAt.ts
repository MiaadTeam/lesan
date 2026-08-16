import { date, defaulted, optional } from "lesan";

export const createUpdateAt = {
  createdAt: optional(defaulted(date(), () => new Date())),
  updatedAt: optional(defaulted(date(), () => new Date())),
};
