import { Bson, Database, Filter, FindOptions } from "../../deps.ts";
import { Projection } from "../aggregation/type.ts";

export interface IFindInput {
  db: Database;
  collection: string;
  projection?: Projection;
  filters?: Filter<Bson.Document>;
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
