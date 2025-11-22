/**
 * File: src/odm/aggregation/generateProjection.ts
 *
 * This file contains functions to generate MongoDB aggregation pipeline stages based on projection objects.
 * It is part of the Lesan framework, which manages data relationships in a NoSQL database (MongoDB) using a denormalized,
 * embedded approach for performance. In Lesan, relationships are bidirectional and automatically managed, with data
 * embedded across related documents to enable efficient queries without frequent joins. However, to handle nested
 * projections (e.g., fetching fields from deeply related schemas), this function generates $lookup stages to fetch
 * data from source collections when necessary, as embedded data may include only IDs or limited fields for nested relations
 * to prevent document size explosion.
 *
 * Key Concepts in Lesan Relationships (based on framework documentation):
 * - **Relationships are Embedded**: Lesan denormalizes data by embedding related documents (or subsets) into parent/child
 *   documents during insert/update/delete operations. This allows simple $project stages for shallow fetches, as data is
 *   already available in the document. For example, a "place" document might embed an array of "comment" objects with
 *   their pure fields (e.g., text, rating) and relation IDs (e.g., user._id).
 * - **mainRelations vs. relatedRelations**:
 *   - **mainRelations**: Defined directly in a schema, representing outgoing relationships (e.g., a "comment" schema
 *     defines a mainRelation to "user" as single, meaning each comment embeds one user object). These are like "owned"
 *     relations where the current schema holds the reference.
 *   - **relatedRelations**: Automatically derived inverse relationships (e.g., defining comment.user adds a "comments"
 *     field to the user schema as multiple). These represent incoming relationships.
 * - **RelationDataType ("single" vs "multiple")**:
 *   - **single**: Represents a one-to-one or many-to-one relation (e.g., comment.user is single; stored as an embedded object).
 *     In aggregations, $unwind is used to flatten the single object for processing, preserving null/empty values.
 *   - **multiple**: Represents a one-to-many or many-to-many relation (e.g., place.comments is multiple; stored as an
 *     embedded array, often limited by count/sort/excludes). No $unwind is applied, as it's already an array.
 * - **Fetching Nested Data**:
 *   - For shallow projections (no nested objects), use simple $project on embedded data—no $lookup needed.
 *   - For nested projections (e.g., place.comments.user.first_name), add $lookup to fetch the full related document
 *     (e.g., comment), where deeper embeds (e.g., user) are available. This skips embedding deep nests in parents for
 *     performance, using IDs instead and looking up only when requested.
 *   - Deeper nesting uses sub-pipelines in $lookup for recursive joins.
 * - **Why $lookup Despite Embedding?**: Embedding includes pure fields and relation IDs, but not always full nested
 *   structures to avoid redundancy and size issues. $lookup fetches from the source collection for nested fields.
 * - **Unwind Usage**: Applied only for "single" relations after $lookup to deconstruct the result array (even if single,
 *   $lookup returns an array), ensuring the output matches the embedded structure (object, not array).
 *
 * This function builds the pipeline recursively, adding $lookup only for relations with nested projections, and a final
 * $project to shape the output.
 */
import { IMainRelation, IRelatedRelation } from "../../mod.ts";
import { RelationDataType, TSchemas } from "../../models/mod.ts";
import { getRelation } from "../../models/relation/getRelation.ts";
import { checkNotLastProjection } from "../mod.ts";
import { Projection, ProjectionPip } from "./type.ts";

/**
 * Generates a MongoDB aggregation pipeline based on a projection object.
 * This top-level function orchestrates the creation of $lookup/$unwind stages for nested relations
 * and appends a final $project stage. It processes only top-level relations with nested projections.
 *
 * @param projection - An object defining fields to include (1) or exclude (0), with nested objects for relations.
 * @param schemasObj - The global schemas object containing all model definitions and relations.
 * @param collectionName - The name of the starting collection (e.g., "place").
 * @returns An array of aggregation pipeline stages.
 */
export const generateProjection = (
  projection: Projection,
  schemasObj: TSchemas,
  collectionName: string,
) => {
  const returnPip: ProjectionPip = [];

  /**
   * Recursively creates $lookup and optional $unwind stages for a relation.
   * This handles both simple lookups (for non-nested) and sub-pipelines (for nested relations).
   * It determines if the property is a main or related relation, fetches the target schema,
   * and decides on sub-pipeline usage based on whether the projection has deeper nesting.
   *
   * @param projection - The sub-projection for this relation.
   * @param localField - The field path in the current document (e.g., "comments" or "comments.user").
   * @param collectionName - The current collection being processed.
   * @param propName - The relation property name (e.g., "comments").
   * @returns An array of pipeline stages for this relation.
   */
  const createLookup = (
    projection: Projection,
    localField: string,
    collectionName: string,
    propName: string,
  ): ProjectionPip[0][] => {
    const stages: ProjectionPip[0][] = [];
    let foundAsMainRelations: IMainRelation | null = null;
    let foundAsRelatedRelations: IRelatedRelation | null = null;

    // Retrieve main and related relations from the schema
    const schemaMainRel = getRelation(
      schemasObj,
      collectionName,
      "mainRelations",
    );
    const schemaRelatedRel = getRelation(
      schemasObj,
      collectionName,
      "relatedRelations",
    );

    // Search for the property in mainRelations
    for (const mainRelProp in schemaMainRel) {
      if (mainRelProp === propName) {
        foundAsMainRelations = schemaMainRel[mainRelProp] as IMainRelation;
      }
    }

    // Search for the property in relatedRelations
    for (const relatedRelProp in schemaRelatedRel) {
      if (relatedRelProp === propName) {
        foundAsRelatedRelations =
          schemaRelatedRel[relatedRelProp] as IRelatedRelation;
      }
    }

    // Use the found relation (main or related); return empty if none
    const foundRelation: IMainRelation | IRelatedRelation | null =
      foundAsMainRelations || foundAsRelatedRelations;
    if (!foundRelation) return stages;

    const from = foundRelation.schemaName; // Target collection to lookup
    const relationType: RelationDataType = foundRelation.type; // "single" or "multiple"
    const unwind = relationType === "single"; // Unwind only for single relations

    // Check if this projection level has deeper nested projections
    let hasNested = false;
    for (const prop in projection) {
      if (
        typeof projection[prop] === "object" &&
        checkNotLastProjection(projection[prop] as Projection)
      ) {
        hasNested = true;
        break;
      }
    }

    // Build the base $lookup object
    const lookup: {
      from: string;
      as: string;
      localField?: string;
      foreignField?: string;
      let?: Record<string, any>;
      pipeline?: ProjectionPip;
    } = {
      from,
      as: localField,
    };

    const subPipeline: ProjectionPip = [];

    if (hasNested) {
      // For nested, use a sub-pipeline with $match to filter by IDs
      const varName = relationType === "single" ? "id" : "ids";
      lookup.let = {
        [varName]: {
          $ifNull: [
            `$${localField}._id`,
            relationType === "single" ? null : [],
          ],
        },
      };
      subPipeline.push({
        $match: {
          $expr: {
            [relationType === "single" ? "$eq" : "$in"]: [
              "$_id",
              `$$${varName}`,
            ],
          },
        },
      });
    } else {
      // For non-nested, simple join on _id (fetches full docs matching embedded IDs)
      lookup.localField = `${localField}._id`;
      lookup.foreignField = "_id";
    }

    // Recursively add stages for nested properties (skip leaf projections)
    for (const prop in projection) {
      if (
        typeof projection[prop] === "object" &&
        checkNotLastProjection(projection[prop] as Projection)
      ) {
        const nestedStages = createLookup(
          projection[prop] as Projection,
          prop,
          from,
          prop,
        );
        subPipeline.push(...nestedStages);
      }
    }

    if (hasNested) {
      // For nested, add inner $project to shape sub-documents early for efficiency
      subPipeline.push({
        $project: { ...projection },
      });
      lookup.pipeline = subPipeline;
    }

    // Add the $lookup stage
    stages.push({ $lookup: lookup });

    // Add $unwind if single relation
    if (unwind) {
      stages.push({
        $unwind: {
          path: `$${localField}`,
          preserveNullAndEmptyArrays: true,
        },
      });
    }

    return stages;
  };

  // Process top-level relations with nesting
  for (const prop in projection) {
    if (
      typeof projection[prop] === "object" &&
      checkNotLastProjection(projection[prop] as Projection)
    ) {
      const relationStages = createLookup(
        projection[prop] as Projection,
        prop,
        collectionName,
        prop,
      );
      returnPip.push(...relationStages);
    }
  }

  // Append final $project to select/shape all requested fields
  returnPip.push({
    "$project": { ...projection },
  });

  return returnPip;
};
