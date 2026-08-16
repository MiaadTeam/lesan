import type { ActFn, Document } from "lesan";
import { user } from "../../../mod.ts";

export const countUsersFn: ActFn = async (body) => {
  const {
    set: { search },
  } = body.details;

  const filters: Document = {};
  search && (filters.$text = { $search: search });

  return await user.countDocument({ filter: filters });
};
