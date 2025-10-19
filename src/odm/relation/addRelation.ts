import { Db, Document, Filter } from "../../npmDeps.ts";
import { createProjection } from "../../models/createProjection.ts";
import {
  IRelationsFileds,
  schemaFns,
  TInsertRelations,
  TSchemas,
} from "../../models/mod.ts";
import { throwError } from "../../utils/throwError.ts";
import { Projection } from "../aggregation/type.ts";
import { handleMultiRelation } from "../utils/insert/handleMultiRelation.ts";
import { handleSingleRelation } from "../utils/insert/handleSingleRelation.ts";
import { processRemoveRelatedRelations } from "../utils/processRemoveRelatedRelations.ts";
import { filterDocByProjection } from "../utils/filterDocByProjection.ts";
import { generateRelationUpdatePipeline } from "../utils/generateRelationUpdatePipeline.ts";

export const addRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  filters,
  relations,
  projection,
  replace,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  filters: Filter<Document>;
  relations: TInsertRelations<TR>;
  projection?: Projection;
  replace?: boolean;
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

  const generatedDoc: Document = {};
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
      foundedSchema.relations[rel].excludes,
    );
    if (foundedSchema.relations[rel]) {
      if (foundedSchema.relations[rel].type === "single") {
        if (foundedDoc![rel] && replace === undefined || replace === false) {
          throwError(
            `the ${rel} relation is already added if you want to replaced this please add replace option`,
          );
        }

        // first remove previus relatedRelation
        if (foundedDoc && foundedDoc[rel]) {
          // first remove previus relatedRelation
          await processRemoveRelatedRelations({
            db,
            rel,
            relations,
            foundedDoc,
            foundedDocPureProjection,
            foundedSchema,
            collection,
            prevRelationDoc: foundedDoc[rel],
            removeDoc: filterDocByProjection(
              foundedDoc,
              pureDocProjection,
            ),
            relDocForUpdate: foundedDoc[rel]._id,
          });
        }

        await handleSingleRelation({
          db,
          relations,
          rel,
          foundedSchema,
          pureRelProjection,
          pureDocProjection,
          generatedDoc,
        });
        await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
          $set: { [rel]: generatedDoc[rel] },
        });
      } else {
        await handleMultiRelation({
          db,
          foundedSchema,
          relations,
          rel,
          pureRelProjection,
          pureDocProjection,
          generatedDoc,
        });

        if (foundedSchema.relations[rel].limit) {
          const generateUpdatePipeline = generateRelationUpdatePipeline(
            rel,
            generatedDoc[rel],
            foundedSchema.relations[rel].sort,
            foundedSchema.relations[rel].limit,
          );

          await db.collection(collection).updateOne(
            { _id: foundedDoc!._id },
            generateUpdatePipeline,
          );
        } else {
          await db.collection(collection).updateOne({ _id: foundedDoc!._id }, {
            $addToSet: { [rel]: { $each: generatedDoc[rel] } },
          });
        }
      }
    }
  }
  return projection
    ? await db.collection(collection).findOne({ _id: foundedDoc!._id }, {
      projection,
    })
    : { _id: foundedDoc!._id };
};
