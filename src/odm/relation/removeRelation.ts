import { Bson, Database, InsertDocument, InsertOptions } from "../../deps.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { TInsertRelations } from "../insert/insertOne.ts";

export const removeRelation = async ({
  db,
  schemasObj,
  collection,
  doc,
  relations,
  options,
  projection,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  doc: InsertDocument<Bson.Document>;
  relations?: TInsertRelations;
  options?: InsertOptions;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
};
