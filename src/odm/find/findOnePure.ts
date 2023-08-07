import { Bson, Database, Filter, FindOptions } from "../../deps.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { findOne } from "./findOne.ts";

export const findOnePure = async (
  db: Database,
  schemasObj: TSchemas,
  collection: string,
  filter: Filter<Bson.Document>,
  options?: FindOptions,
) => {
  const projection: Projection = {};
  const PureSchema = schemaFns(schemasObj).getSchema(collection).pure;

  for (const key in PureSchema) {
    projection[key] = 1;
  }

  return await findOne(db, schemasObj, collection, filter, projection, options);
};
