import { ObjectId } from "../../../deps.ts";
import { throwError } from "../../../utils/mod.ts";
import { findOne } from "../../find/findOne.ts";
import { insertRelatedRelationForFirstTime } from "./insertRelatedRelationForFirstTime.ts";
import { proccessRelatedRelation } from "./proccessRelatedRelation.ts";

export const handleSingleRelation = async ({
  db,
  relations,
  rel,
  foundedSchema,
  pureProjection,
  generatedDoc,
  newObjId,
  doc,
}: {
  db: any;
  relations: any;
  rel: any;
  foundedSchema: any;
  pureProjection: any;
  generatedDoc: any;
  newObjId: any;
  doc: any;
}) => {
  const foundedSingleMainRelation = await findOne({
    db,
    collection: foundedSchema.relations[rel].schemaName,
    filters: { _id: relations![rel]._ids },
  });

  if (!foundedSingleMainRelation) {
    throwError(`can not find this relatation : ${rel}`);
  }

  const pureOfFoundedSingleMainRelation: Record<string, any> = {};

  for (const pureKey in pureProjection) {
    pureOfFoundedSingleMainRelation[pureKey] =
      foundedSingleMainRelation![pureKey];
  }

  generatedDoc[`${rel}`] = pureOfFoundedSingleMainRelation;

  for (
    const relatedRel in foundedSchema.relations[rel]
      .relatedRelations
  ) {
    const relatedRelation =
      foundedSchema.relations[rel].relatedRelations[relatedRel];
    const relationSchemName = foundedSchema.relations[rel].schemaName;
    const lengthOfRel: number = foundedSingleMainRelation![relatedRel]
      ? foundedSingleMainRelation![relatedRel].length
      : 0;
    const updateId: ObjectId = foundedSingleMainRelation!._id;
    const updatedDoc = { _id: newObjId, ...doc };
    const fieldName = relatedRelation.sort ? relatedRelation.sort.field : "";

    if (
      relations && relations[rel] && relations[rel].relatedRelations &&
      relations[rel].relatedRelations![relatedRel] === true
    ) {
      if (foundedSingleMainRelation![relatedRel]) {
        await proccessRelatedRelation({
          db,
          relatedRelation,
          relatedRel,
          lengthOfRel,
          fieldName,
          updateId,
          updatedDoc,
          collection: relationSchemName,
          doc,
          foundedSingleMainRelation,
          foundedSchema,
          rel,
          newObjId,
        });
      } else {
        await insertRelatedRelationForFirstTime({
          db,
          collection: foundedSchema.relations[rel].schemaName,
          updateKeyName: relatedRel,
          updateId: foundedSingleMainRelation!._id,
          updatedDoc: { _id: newObjId, ...doc },
          type: foundedSchema.relations[rel].relatedRelations[relatedRel]
            .type,
        });
      }
    }
  }
};
