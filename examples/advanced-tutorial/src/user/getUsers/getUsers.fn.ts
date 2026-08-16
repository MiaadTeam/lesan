import type { ActFn, Document } from "lesan";
import { user } from "../../../mod.ts";

export const getUsersFn: ActFn = async (body) => {
  const {
    set: { page, limit, skip, search, roles, sortBy, sortOrder },
    get,
  } = body.details;

  const pipeline: Document[] = [];

  search &&
    pipeline.push({
      $match: { $text: { $search: search } },
    });

  roles && roles.length > 0 &&
    pipeline.push({
      $match: { "roles.name": { $in: roles } },
    });

  if (search && (!sortBy || sortBy === "relevance")) {
    pipeline.push({
      $addFields: {
        textScore: { $meta: "textScore" },
      },
    });
  }

  const sortField = sortBy === "relevance" ? "textScore" : (sortBy || "_id");
  const sortDirection = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: { [sortField]: sortDirection } });

  const calculatedSkip = skip ?? limit * (page - 1);
  pipeline.push({ $skip: calculatedSkip });
  pipeline.push({ $limit: limit });

  return await user
    .aggregation({
      pipeline,
      projection: get,
    })
    .toArray();
};
