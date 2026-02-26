/**
 * File: src/odm/find/aggregation.ts
 *
 * This file provides a function to perform MongoDB aggregation operations
 * with support for generating projection pipelines based on relation schemas.
 */

import { TSchemas } from "../../models/mod.ts";
import { AggregateOptions, Db, Document } from "../../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { generateProjection } from "../aggregation/mod.ts";
import { Projection } from "../aggregation/type.ts";

/**
 * Performs MongoDB aggregation with optional projection pipeline generation.
 * This function takes an initial pipeline and adds generated projection stages
 * if a projection object is provided.
 *
 * Parameters:
 * - db: The MongoDB database instance
 * - schemasObj: The schemas object containing collection relations
 * - collection: The name of the collection to query
 * - pipeline: The initial aggregation pipeline stages
 * - options: Optional aggregation options
 * - projection: Optional projection object to define the output shape
 *
 * Returns:
 * - A MongoDB aggregation cursor
 */
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
  // Generate projection pipeline stages if a projection is provided
  const genProjection = projection
    ? generateProjection(projection, schemasObj, collection)
    : [];

  // Combine the initial pipeline with the generated projection stages
  pipeline = [...pipeline, ...genProjection] as Document[];

  // Execute the aggregation or throw an error if no database connection
  return db
    ? db.collection(collection).aggregate(pipeline, options)
    : throwError("No database connection");
};
