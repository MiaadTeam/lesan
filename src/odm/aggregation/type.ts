/**
 * File: src/odm/aggregation/type.ts
 *
 * This file defines TypeScript types for MongoDB aggregation pipeline stages
 * used in projection operations.
 */

/**
 * Type representing a MongoDB projection object.
 * Can contain either field inclusion (1) or nested projection objects.
 */
export type Projection = { [key: string]: number | Projection };

/**
 * Interface representing a MongoDB $lookup stage configuration.
 * Used to join documents from different collections.
 */
export interface Lookup {
  from: string; // The collection to join with
  localField: string; // The field from the input documents
  foreignField: string; // The field from the documents of the "from" collection
  as: string; // The name for the new array field to add to the input documents
}

/**
 * Interface representing a MongoDB $unwind stage configuration.
 * Used to deconstruct an array field from the input documents.
 */
export interface Unwind {
  path: string; // The field path to unwind
  preserveNullAndEmptyArrays: true; // Whether to preserve null and empty arrays
}

/**
 * Type representing a MongoDB $lookup pipeline stage.
 */
export type LookupObj = {
  $lookup: Lookup;
};

/**
 * Type representing a MongoDB $unwind pipeline stage.
 */
export type UnwindObj = {
  $unwind: Unwind;
};

/**
 * Type representing a MongoDB $project pipeline stage.
 */
export type ProjectionObj = {
  $project: Projection;
};

/**
 * Type representing an array of MongoDB aggregation pipeline stages
 * that can include lookups, unwinds, and projections.
 */
export type ProjectionPip = (LookupObj | UnwindObj | ProjectionObj)[];
