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

export const aggregation = async (
  {
    db,
    schemasObj,
    collection,
    pipline,
    options,
    get,
  }: {
    db: Database;
    schemasObj: TSchemas;
    collection: string;
    pipline: AggregatePipeline<Bson.Document>[];
    options?: AggregateOptions | undefined;
    get?: Projection;
  },
) => {
  const projection = get ? generateProjection(get, schemasObj, collection) : [];
  pipline = [...pipline, ...projection];

  return db
    ? await db.collection(collection).aggregate(pipline, options).toArray()
    : throwError("No database connection");
};
