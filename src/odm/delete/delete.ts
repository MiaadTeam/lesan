import { Database } from "../../deps.ts";
import { DeleteOptions } from "../../deps.ts";
import { Bson } from "../../deps.ts";
import { throwError } from "../../utils/mod.ts";

export const deleteMethod = async (
  db: Database,
  collection: string,
  query: Bson.Document,
  options?: DeleteOptions,
) => {
  return db
    ? await db.collection(collection).delete(query, options)
    : throwError("No database connection");
};
