import { Database, DeleteOptions, ObjectId } from "../../deps.ts";
import { TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/mod.ts";
import { aggregation } from "../find/aggregation.ts";

export const deleteById = async ({
  db,
  schemasObj,
  collection,
  _id,
  options,
  get,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  _id: ObjectId | string;
  options?: DeleteOptions;
  get?: Projection;
}) => {
  const getAggregation = async () =>
    await aggregation({
      db,
      schemasObj,
      collection,
      pipeline: [{ $match: { _id } }],
      projection: get,
    }).toArray();

  const deletedData = await db.collection(collection).deleteOne(
    { _id },
    options,
  );

  return db
    ? get ? await getAggregation() : deletedData
    : throwError("No database connection");
};
