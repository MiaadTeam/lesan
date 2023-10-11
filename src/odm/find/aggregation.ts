import { TSchemas } from "../../models/mod.ts";
import { AggregateOptions, Db, Document } from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { generateProjection } from "../aggregation/mod.ts";
import { Projection } from "../aggregation/type.ts";

export const aggregation = (
  {
    db,
    schemasObj,
    collection,
    pipeline,
    options,
    projection,
  }: {
    db: Db;
    schemasObj: TSchemas;
    collection: string;
    pipeline: Document[];
    options?: AggregateOptions;
    projection?: Projection;
  },
) => {
  const genProjection = projection
    ? generateProjection(projection, schemasObj, collection)
    : [];
  pipeline = [...pipeline, ...genProjection] as Document[];

  return db
    ? db.collection(collection).aggregate(pipeline, options)
    : throwError("No database connection");
};
