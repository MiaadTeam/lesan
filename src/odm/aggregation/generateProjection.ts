/**
 * File: src/odm/aggregation/generateProjection.ts
 *
 * This file contains functions to generate MongoDB aggregation pipeline stages
 * based on projection objects. It handles relationships between collections using lookups
 * and unwinds for single-type relations.
 */
import { RelationDataType, TSchemas } from "../../models/mod.ts";
import { getRelation } from "../../models/relation/getRelation.ts";
import { Projection, ProjectionPip } from "./type.ts";
/**
 * Generates a MongoDB aggregation pipeline based on a projection object.
 * This function creates $lookup and $unwind stages for related collections,
 * and a final $project stage to shape the output.
 *
 * Parameters:
 * - projection: An object defining which fields to include in the result
 * - schemasObj: The schemas object containing collection relations
 * - collectionName: The name of the main collection being queried
 *
 * Returns:
 * - An array of MongoDB aggregation pipeline stages
 */
export const generateProjection = (
  projection: Projection,
  schemasObj: TSchemas,
  collectionName: string,
) => {
  const returnPip: ProjectionPip = [];
  /**
   * Creates MongoDB aggregation lookup stages for related collections.
   * This function processes nested projections and creates the necessary
   * $lookup and $unwind stages to fetch related documents.
   *
   * Parameters:
   * - projection: The projection object for the related collection
   * - localField: The field name in the current document that contains the relation
   * - collectionName: The name of the current collection being processed
   * - propName: The property name being looked up in relations
   */
  const createLookup = (
    projection: Projection,
    localField: string,
    collectionName: string,
    propName: string,
  ): ProjectionPip[0][] => {
    const stages: ProjectionPip[0][] = [];
    let foundAsMainRelations = null;
    let foundAsRelatedRelations = null;
    // Get main and related relations for the collection
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
    // Check if the property is a main relation (one-to-many or one-to-one from this collection's perspective)
    for (const mainRelProp in schemaMainRel) {
      (mainRelProp === propName) &&
        (foundAsMainRelations = schemaMainRel[mainRelProp]);
    }
    // Check if the property is a related relation (many-to-one or many-to-many from this collection's perspective)
    for (const relatedRelProp in schemaRelatedRel) {
      (relatedRelProp === propName) &&
        (foundAsRelatedRelations = schemaRelatedRel[relatedRelProp]);
    }
    const foundRelation = foundAsMainRelations || foundAsRelatedRelations;
    if (!foundRelation) return stages;
    const from = foundRelation.schemaName;
    const relationType: RelationDataType = foundRelation.type;
    const unwind = relationType === "single";
    let hasNested = false;
    for (const prop in projection) {
      if (typeof projection[prop] === "object") {
        hasNested = true;
        break;
      }
    }
    const lookup: any = {
      from,
      as: localField,
    };
    if (hasNested) {
      const varName = relationType === "single" ? "id" : "ids";
      lookup.let = { [varName]: `$${localField}._id` };
      const subPipeline: any[] = [
        {
          $match: {
            $expr: {
              [relationType === "single" ? "$eq" : "$in"]: [
                "$_id",
                `$$${varName}`,
              ],
            },
          },
        },
      ];
      for (const prop in projection) {
        if (typeof projection[prop] === "object") {
          const nestedStages = createLookup(
            projection[prop] as Projection,
            prop,
            from,
            prop,
          );
          subPipeline.push(...nestedStages);
        }
      }
      subPipeline.push({
        $project: { ...projection },
      });
      lookup.pipeline = subPipeline;
    } else {
      lookup.localField = `${localField}._id`;
      lookup.foreignField = "_id";
    }
    stages.push({ $lookup: lookup });
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
  // Process the top-level projection to create lookups for nested relations
  for (const prop in projection) {
    if (typeof projection[prop] === "object") {
      const relationStages = createLookup(
        projection[prop] as Projection,
        prop,
        collectionName,
        prop,
      );
      returnPip.push(...relationStages);
    }
  }
  // Add the final $project stage to shape the output according to the projection
  returnPip.push({
    "$project": { ...projection },
  });
  return returnPip;
};
