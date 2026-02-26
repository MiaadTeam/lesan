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
  localField?: string; // The field from the input documents (for localField/foreignField format)
  foreignField?: string; // The field from the documents of the "from" collection (for localField/foreignField format)
  as: string; // The name for the new array field to add to the input documents
  let?: { [key: string]: string }; // Variables to define in the pipeline (for pipeline format)
  pipeline?: ProjectionPip; // The aggregation pipeline to run on the joined collection (for pipeline format)
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
 * Interface for MongoDB $match stage
 */
export interface Match {
  $match: { [key: string]: any };
}

/**
 * Interface for MongoDB $addFields stage
 */
export interface AddFields {
  $addFields: { [key: string]: any };
}

/**
 * Interface for MongoDB $sort stage
 */
export interface Sort {
  $sort: { [key: string]: 1 | -1 };
}

/**
 * Interface for MongoDB $group stage
 */
export interface Group {
  $group: { [key: string]: any };
}

/**
 * Interface for MongoDB $limit stage
 */
export interface Limit {
  $limit: number;
}

/**
 * Interface for MongoDB $skip stage
 */
export interface Skip {
  $skip: number;
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
 * Type representing a MongoDB $match pipeline stage.
 */
export type MatchObj = Match;

/**
 * Type representing a MongoDB $addFields pipeline stage.
 */
export type AddFieldsObj = AddFields;

/**
 * Type representing a MongoDB $sort pipeline stage.
 */
export type SortObj = Sort;

/**
 * Type representing a MongoDB $group pipeline stage.
 */
export type GroupObj = Group;

/**
 * Type representing a MongoDB $limit pipeline stage.
 */
export type LimitObj = Limit;

/**
 * Type representing a MongoDB $skip pipeline stage.
 */
export type SkipObj = Skip;

/**
 * Type representing an array of MongoDB aggregation pipeline stages
 * that can include various aggregation operations.
 */
export type PipelineStage =
  | LookupObj
  | UnwindObj
  | ProjectionObj
  | MatchObj
  | AddFieldsObj
  | SortObj
  | GroupObj
  | LimitObj
  | SkipObj;

/**
 * Type representing an array of MongoDB aggregation pipeline stages
 * that can include lookups, unwinds, and projections.
 */
export type ProjectionPip = PipelineStage[];
