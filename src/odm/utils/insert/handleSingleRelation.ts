import { IModel, IRelationsFileds } from "../../../mod.ts";
import { Db, ObjectId } from "../../../npmDeps.ts";
import { throwError } from "../../../utils/mod.ts";
import { findOne } from "../../find/findOne.ts";
import { TInsertRelations } from "../../insert/insertOne.ts";
import { filterDocByProjection } from "../filterDocByProjection.ts";
import { proccessRelatedRelation } from "./proccessRelatedRelation.ts";

export const handleSingleRelation = async <TR extends IRelationsFileds>({
  db,
  relations,
  rel,
  foundedSchema,
  pureDocProjection,
  pureRelProjection,
  generatedDoc,
  replace,
}: {
  db: Db;
  relations: TInsertRelations<TR>;
  rel: string;
  foundedSchema: IModel;
  pureRelProjection: Record<string, any>;
  pureDocProjection: Record<string, any>;
  generatedDoc: Record<string, any>;
  replace?: boolean;
}) => {
  const pureGeneratedDoc = filterDocByProjection(
    generatedDoc,
    pureDocProjection,
  );

  const foundedSingleMainRelation = await findOne({
    db,
    collection: foundedSchema.relations[rel].schemaName,
    filters: { _id: relations![rel]!._ids },
  });

  if (!foundedSingleMainRelation) {
    throwError(`can not find this relatation : ${rel}`);
  }

  const pureOfFoundedSingleMainRelation: Record<string, any> = {};

  for (const pureKey in pureRelProjection) {
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
    const updateId: ObjectId = foundedSingleMainRelation!._id;

    if (
      relations && relations[rel] && relations[rel]!.relatedRelations &&
      relations[rel]!.relatedRelations![relatedRel] === true
    ) {
      await proccessRelatedRelation({
        db,
        relatedRelation,
        relatedRel,
        updateId,
        updatedDoc: pureGeneratedDoc,
        collection: relationSchemName,
      });
    }
  }
};
