import { InRelation } from "../../mod.ts";
import { ISchema } from "../../models/mod.ts";
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
  schemasObj: ISchema,
  collectionName: string,
) => {
  const returnPip: ProjectionPip = [];

  const createLookup = (
    projection: Projection,
    localField: string,
    collectionName: string,
    propName: string,
  ) => {
    let foundAsInrelation = null;
    let foundAsOutrelation = null;

    const schemaInrel = getRelation(schemasObj, collectionName, "inrelation");
    const schemaOutrel = getRelation(schemasObj, collectionName, "outrelation");

    for (const inrelProp in schemaInrel) {
      (inrelProp === propName) &&
        (foundAsInrelation = schemaInrel[inrelProp]);
    }

    for (const outrelProp in schemaOutrel) {
      (outrelProp === propName) &&
        (foundAsOutrelation = schemaOutrel[outrelProp]);
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

    foundAsInrelation
      ? pushLockupPip(
        foundAsInrelation.schemaName,
        localField,
        (foundAsInrelation as InRelation).type === "one" ? true : false,
      )
      : foundAsOutrelation
      ? pushLockupPip(foundAsOutrelation.schemaName, localField, false)
      : null;

    if (foundAsInrelation || foundAsOutrelation) {
      for (const prop in projection) {
        typeof projection[prop] === "object" &&
          checkNotLastObj(
            projection[prop] as Projection,
          ) &&
          createLookup(
            projection[prop] as Projection,
            `${localField}.${prop}`,
            foundAsInrelation
              ? foundAsInrelation.schemaName
              : foundAsOutrelation!.schemaName,
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
