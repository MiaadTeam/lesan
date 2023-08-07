import { IMainRelation } from "../../mod.ts";
import { TSchemas } from "../../models/mod.ts";
import { getRelation } from "../../models/relation/getRelation.ts";
import { Projection, ProjectionPip } from "./type.ts";

export const checkNotLastObj = (
  projection: Projection,
) => {
  let notLast = false;

  for (const prop in projection) {
    typeof projection[prop] === "object" &&
      (notLast = true);
  }

  return notLast ? true : false;
};

export const generateProjection = (
  projection: Projection,
  schemasObj: TSchemas,
  collectionName: string,
) => {
  const returnPip: ProjectionPip = [];

  const createLookup = (
    projection: Projection,
    localField: string,
    collectionName: string,
    propName: string,
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

    const pushLockupPip = (
      from: string,
      localField: string,
      unwind: boolean,
    ) => {
      returnPip.push({
        "$lookup": {
          from,
          localField: `${localField}._id`,
          "foreignField": `_id`,
          "as": localField,
        },
      });

      unwind && returnPip.push({
        "$unwind": {
          path: `$${localField}`,
          preserveNullAndEmptyArrays: true,
        },
      });
    };

    foundAsMainRelations
      ? pushLockupPip(
        foundAsMainRelations.schemaName,
        localField,
        (foundAsMainRelations as IMainRelation).type === "single"
          ? true
          : false,
      )
      : foundAsRelatedRelations
      ? pushLockupPip(foundAsRelatedRelations.schemaName, localField, false)
      : null;

    if (foundAsMainRelations || foundAsRelatedRelations) {
      for (const prop in projection) {
        typeof projection[prop] === "object" &&
          checkNotLastObj(
            projection[prop] as Projection,
          ) &&
          createLookup(
            projection[prop] as Projection,
            `${localField}.${prop}`,
            foundAsMainRelations
              ? foundAsMainRelations.schemaName
              : foundAsRelatedRelations!.schemaName,
            prop,
          );
      }
    }
  };

  for (const prop in projection) {
    typeof projection[prop] === "object" &&
      checkNotLastObj(
        projection[prop] as Projection,
      ) &&
      createLookup(projection[prop] as Projection, prop, collectionName, prop);
  }

  returnPip.push({
    "$project": { ...projection },
  });

  return returnPip;
};
