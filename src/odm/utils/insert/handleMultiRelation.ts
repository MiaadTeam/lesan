import { Bson, Database, InsertDocument, ObjectId } from "../../../deps.ts";
import { IModel, IRelationsFileds } from "../../../mod.ts";
import { throwError } from "../../../utils/mod.ts";
import { find } from "../../find/find.ts";
import { TInsertRelations } from "../../insert/insertOne.ts";
import { filterDocByProjection } from "../filterDocByProjection.ts";
import { filterDocsByProjection } from "../filterDocsByProjection.ts";
import { insertRelatedRelationForFirstTime } from "./insertRelatedRelationForFirstTime.ts";
import { proccessRelatedRelation } from "./proccessRelatedRelation.ts";

export const handleMultiRelation = async <TR extends IRelationsFileds>({
  db,
  foundedSchema,
  relations,
  rel,
  pureDocProjection,
  pureRelProjection,
  generatedDoc,
}: {
  db: Database;
  relations: TInsertRelations<TR>;
  rel: string;
  foundedSchema: IModel;
  pureRelProjection: Record<string, any>;
  pureDocProjection: Record<string, any>;
  generatedDoc: Record<string, any>;
}) => {
  const pureOfGeneratedDoc = filterDocByProjection(
    generatedDoc,
    pureDocProjection,
  );

  const foundedMultiMainRelation = await find({
    db,
    collection: foundedSchema.relations[rel].schemaName,
    filters: { _id: { "$in": relations![rel]!._ids } },
  }).toArray();

  if (!foundedMultiMainRelation) {
    throwError(`can not find this relatation : ${rel}`);
  }

  if (
    foundedMultiMainRelation.length !==
      (relations![rel]!._ids as ObjectId[]).length
  ) {
    throwError(`we have problem with this relatation : ${rel}`);
  }

  const pureOfFoundedMultiMainRelation = filterDocsByProjection(
    foundedMultiMainRelation,
    pureRelProjection,
  );

  generatedDoc[`${rel}`] = pureOfFoundedMultiMainRelation;

  for (
    const relatedRel in foundedSchema.relations[rel]
      .relatedRelations
  ) {
    const relatedRelation =
      foundedSchema.relations[rel].relatedRelations[relatedRel];
    const relationSchemName = foundedSchema.relations[rel].schemaName;
    const fieldName = relatedRelation.sort ? relatedRelation.sort.field : "";
    foundedMultiMainRelation.forEach(async (FMR) => {
      if (
        relations && relations[rel] && relations[rel]!.relatedRelations &&
        relations[rel]!.relatedRelations![relatedRel] === true
      ) {
        const lengthOfRel: number = FMR![relatedRel]
          ? FMR![relatedRel].length
          : 0;
        const updateId: ObjectId = FMR._id;

        if (FMR![relatedRel]) {
          await proccessRelatedRelation({
            db,
            relatedRelation,
            relatedRel,
            lengthOfRel,
            fieldName,
            updateId,
            updatedDoc: pureOfGeneratedDoc,
            collection: relationSchemName,
            foundedSingleMainRelation: FMR,
            foundedSchema,
            rel,
          });
        } else {
          await insertRelatedRelationForFirstTime({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            updateKeyName: relatedRel,
            updateId: FMR._id,
            updatedDoc: pureOfGeneratedDoc,
            type: foundedSchema.relations[rel].relatedRelations[relatedRel]
              .type,
          });
        }
      }
    });
  }
};
