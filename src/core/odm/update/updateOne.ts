import {
  Db,
  Document,
  Filter,
  UpdateFilter,
  UpdateOptions,
} from "../../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";

export const updateOne = async <PureFields extends Document = Document>(
  { db, collection, filter, update, options }: {
    db: Db;
    collection: string;
    filter: Filter<PureFields>;
    update: UpdateFilter<Document>;
    options?: UpdateOptions;
  },
) => {
  return db
    ? await db.collection(collection).updateOne(
      filter as Filter<Document>,
      update,
      options,
    )
    : throwError("No database connection");
};
