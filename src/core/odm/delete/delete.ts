import { Db, DeleteOptions, Document, Filter } from "../../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";

export const deleteMethod = async <PureFields extends Document>(
  db: Db,
  collection: string,
  query?: Filter<PureFields>,
  options?: DeleteOptions,
) => {
  return db
    ? await db.collection(collection).deleteMany(
      query as Filter<Document>,
      options,
    )
    : throwError("No database connection");
};
