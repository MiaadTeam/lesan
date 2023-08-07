import {
  Bson,
  Database,
  ObjectId,
  UpdateFilter,
  UpdateOptions,
} from "../../deps.ts";
import { TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { aggregation } from "../find/aggregation.ts";

export const updateById = async ({
  db,
  schemasObj,
  collection,
  _id,
  update,
  options,
  get,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  _id: string | ObjectId;
  update: UpdateFilter<Bson.Document>;
  options?: UpdateOptions;
  get?: Projection;
}) => {
  const getAggregation = async () =>
    await aggregation({
      db,
      schemasObj,
      collection,
      pipline: [{ $match: { _id } }],
      get,
    });

  const updatedData = await db.collection(collection).updateOne(
    { _id },
    update,
    options,
  );

  return db
    ? get ? await getAggregation() : updatedData
    : throwError("No database connection");
};
