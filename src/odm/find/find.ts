import { Db, Document, Filter, FindOptions } from "../../npmDeps.ts";
import { Projection } from "../aggregation/type.ts";

export interface IFindInput {
  db: Db;
  collection: string;
  projection?: Projection;
  filters: Filter<Document>;
  options?: FindOptions;
}

export const find = ({
  db,
  collection,
  filters,
  projection,
  options,
}: IFindInput) => {
  return db.collection(collection).find(filters, { ...options, projection });
};
