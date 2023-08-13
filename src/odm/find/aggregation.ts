import {
  AggregateOptions,
  AggregatePipeline,
  Bson,
  Database,
} from "../../deps.ts";
import { TSchemas } from "../../models/mod.ts";
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
    db: Database;
    schemasObj: TSchemas;
    collection: string;
    pipeline: AggregatePipeline<Bson.Document>[];
    options?: AggregateOptions | undefined;
    projection?: Projection;
  },
) => {
  const genProjection = projection
    ? generateProjection(projection, schemasObj, collection)
    : [];
  pipeline = [...pipeline, ...genProjection];

  return db
    ? db.collection(collection).aggregate(pipeline, options)
    : throwError("No database connection");
};
