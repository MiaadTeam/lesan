import {
  Bson,
  Database,
  Filter,
  UpdateFilter,
  UpdateOptions,
} from "../../deps.ts";
import { throwError } from "../../utils/mod.ts";

export const updateOne = async (
  db: Database,
  collection: string,
  filter: Filter<Bson.Document>,
  update: UpdateFilter<Bson.Document>,
  options?: UpdateOptions,
) => {
  return db
    ? await db.collection(collection).updateOne(filter, update, options)
    : throwError("No database connection");
};
