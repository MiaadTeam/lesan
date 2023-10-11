import { IModel, IRelationsFileds } from "../../../mod.ts";
import { Db, ObjectId } from "../../../npmDeps.ts";
import { throwError } from "../../../utils/mod.ts";
import { find } from "../../find/find.ts";
import { TInsertRelations } from "../../insert/insertOne.ts";
import { filterDocByProjection } from "../filterDocByProjection.ts";
import { filterDocsByProjection } from "../filterDocsByProjection.ts";
import { generateUpdateFilter } from "../generateUpdateFilter.ts";

export const handleMultiRelation = async <TR extends IRelationsFileds>({
  db,
  foundedSchema,
  relations,
  rel,
  pureDocProjection,
  pureRelProjection,
  generatedDoc,
}: {
  db: Db;
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

  const findWithIds = {
    _id: { "$in": (relations[rel]!._ids as ObjectId[]) },
  };

  const foundedMultiMainRelation = await find({
    db,
    collection: foundedSchema.relations[rel].schemaName,
    filters: findWithIds,
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

    if (
      relations && relations[rel] && relations[rel]!.relatedRelations &&
      relations[rel]!.relatedRelations![relatedRel] === true
    ) {
      const updateFilter = generateUpdateFilter({
        relatedRelation,
        relatedRel,
        updatedDoc: pureOfGeneratedDoc,
      });

      const updatedRel = await db.collection(relationSchemName).updateMany(
        findWithIds,
        updateFilter,
      );

      return updatedRel;
    }
  }
};
