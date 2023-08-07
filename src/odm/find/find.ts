import { Bson, Database, Filter, FindOptions } from "../../deps.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { assert, enums } from "../../npmDeps.ts";
import { Projection } from "../aggregation/type.ts";
import { collectData, makeProjection } from "../mod.ts";

export const find = async (
  schemasObj: TSchemas,
  db: Database,
  collection: string,
  filter: Filter<Bson.Document>,
  get: Projection,
  options?: FindOptions,
) => {
  const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
  const schemas = schemaFns(schemasObj).getSchemas();
  assert(collection, getSchemas);

  const projection = makeProjection(collection, {}, get, schemas);

  const result = await collectData(
    schemas,
    filter,
    db,
    projection,
    collection,
    {},
    "mutiple",
    options,
  );
  return result;
};
