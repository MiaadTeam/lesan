import { Bson, Database, Filter, FindOptions } from "../../deps.ts";
import { IMainRelation, TSchemas } from "../../models/mod.ts";
import { getRelation } from "../../models/relation/getRelation.ts";

import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { checkNotLastProjecion } from "./checkNotLastProjection.ts";

export const collectData = async (
  db: Database,
  schemasObj: TSchemas,
  projection: Projection,
  collectionName: string,
  filter?: Filter<Bson.Document>,
  findOptions?: FindOptions,
) => {
  const returnPip: any = [];

  const findData = async (
    projection: Projection,
    collectionName: string,
    propName: string,
    filter?: Filter<Bson.Document>,
    findOptions?: FindOptions,
  ) => {
    let foundAsMainRelations = null;
    let foundAsRelatedRelations = null;

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

    for (const mainRelProp in schemaMainRel) {
      (mainRelProp === propName) &&
        (foundAsMainRelations = schemaMainRel[mainRelProp]);
    }

    for (const relatedRelProp in schemaRelatedRel) {
      (relatedRelProp === propName) &&
        (foundAsRelatedRelations = schemaRelatedRel[relatedRelProp]);
    }

    const findAndPushData = async (
      collectionName: string,
      filter?: Filter<Bson.Document>,
      findOptions?: FindOptions,
    ) => {
      return await db.collection(collectionName).find(filter, findOptions)
        .toArray();
    };

    foundAsMainRelations
      ? findAndPushData(
        collectionName,
        filter,
        findOptions,
      )
      : foundAsRelatedRelations
      ? findAndPushData(collectionName, filter, findOptions)
      : null;

    if (foundAsMainRelations || foundAsRelatedRelations) {
      for (const prop in projection) {
        typeof projection[prop] === "object" &&
          checkNotLastProjecion(
            projection[prop] as Projection,
          ) &&
          await findData(
            projection[prop] as Projection,
            collectionName,
            prop,
            filter,
            findOptions,
          );
      }
    }
  };

  for (const prop in projection) {
    typeof projection[prop] === "object" &&
      checkNotLastProjecion(
        projection[prop] as Projection,
      ) &&
      await findData(
        projection[prop] as Projection,
        collectionName,
        prop,
        filter,
        findOptions,
      );
  }

  returnPip.push({
    "$project": { ...projection },
  });

  return returnPip;
};
