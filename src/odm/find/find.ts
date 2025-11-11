/**
 * File: src/odm/find/find.ts
 *
 * This file provides a function to perform MongoDB find operations
 * with optional projection support.
 */

import { Db, Document, Filter, FindOptions } from "../../npmDeps.ts";
import { Projection } from "../aggregation/type.ts";

/**
 * Interface defining the input parameters for the find function.
 */
export interface IFindInput {
  db: Db; // The MongoDB database instance
  collection: string; // The name of the collection to query
  projection?: Projection; // Optional projection object to define the output shape
  filters: Filter<Document>; // MongoDB filter object to specify query conditions
  options?: FindOptions; // Optional find operation options
}

/**
 * Performs MongoDB find operation with optional projection.
 *
 * Parameters:
 * - db: The MongoDB database instance
 * - collection: The name of the collection to query
 * - filters: MongoDB filter object to specify query conditions
 * - projection: Optional projection object to define the output shape
 * - options: Optional find operation options
 *
 * Returns:
 * - A MongoDB cursor for the matching documents
 */
export const find = ({
  db,
  collection,
  filters,
  projection,
  options,
}: IFindInput) => {
  return db.collection(collection).find(filters, { ...options, projection });
};
