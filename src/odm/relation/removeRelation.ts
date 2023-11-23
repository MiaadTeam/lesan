import { Db, Document, Filter, ObjectId } from "../../npmDeps.ts";
import { IRelationsFileds, schemaFns, TSchemas } from "../../models/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { TInsertRelations } from "../insert/insertOne.ts";
import { throwError } from "../../utils/throwError.ts";
import { createProjection } from "../../models/createProjection.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";
import { processRemoveRelatedRelations } from "../utils/processRemoveRelatedRelations.ts";

export const removeRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  relations,
  projection,
  filters,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  filters: Filter<Document>;
  relations: TInsertRelations<TR>;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const foundedDoc = await db.collection(collection).findOne(filters);

  if (!foundedDoc) {
    throwError("can not find this document");
  }

  const foundedDocPureProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  const generatedDoc: Record<string, any> = {};
  for (const pureKey in foundedDocPureProjection) {
    generatedDoc[pureKey] = foundedDoc![pureKey];
  }
  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  for (const rel in relations) {
    const pureRelProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
    );
    if (foundedSchema.relations[rel]) {
      if (foundedSchema.relations[rel].type === "single") {
        if (foundedSchema.relations[rel].optional === false) {
          throwError(
            "this relation can not be removed becuase it's single and not optional, please use addRelation to replace it",
          );
        }
        if (!foundedDoc![rel]._id.equals(relations[rel]?._ids)) {
          throwError(
            `the _ids you sent is not compitable with this relations ${rel}`,
          );
        }

        // first remove previus relatedRelation
        await processRemoveRelatedRelations({
          db,
          rel,
          relations,
          foundedDoc,
          foundedDocPureProjection,
          foundedSchema,
          collection,
          prevRelationDoc: foundedDoc![rel],
          removeDoc: filterDocByProjection(
            foundedDoc!,
            pureDocProjection,
          ),
          relDocForUpdate: foundedDoc![rel]._id,
        });

        await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
          $set: { [rel]: {} },
        });
      } else {
        if (!Array.isArray(foundedDoc![rel])) {
          throwError(
            `Sorry the type of ${rel} is not Array`,
          );
        }

        if (!Array.isArray(relations[rel]?._ids)) {
          throwError(
            `You most send Array of _ids for ${rel} relation`,
          );
        }

        const relationIds = relations[rel]?._ids as ObjectId[];

        for (const rr in relationIds) {
          if (
            !foundedDoc![rel].some((fr: any) => fr._id.equals(relationIds[rr]))
          ) {
            throwError(
              `${relationIds[rr]} dos not exits in the ${rel}`,
            );
          }
        }

        // first remove previus relatedRelation
        for (const rr in relationIds) {
          const foundedRelationDoc = foundedDoc![rel].find((drr: any) =>
            drr._id.equals(relationIds[rr])
          );
          await processRemoveRelatedRelations({
            db,
            rel,
            relations,
            foundedDoc,
            foundedDocPureProjection,
            foundedSchema,
            collection,
            prevRelationDoc: foundedRelationDoc,
            removeDoc: filterDocByProjection(
              foundedDoc!,
              pureDocProjection,
            ),
            relDocForUpdate: foundedRelationDoc._id,
          });
        }
        await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
          $pull: { [rel]: { _id: { $in: relations[rel]?._ids } } },
        });
      }
    }
  }

  return projection
    ? await db.collection(collection).findOne({ _id: foundedDoc!._id }, {
      projection,
    })
    : { _id: foundedDoc!._id };
};
