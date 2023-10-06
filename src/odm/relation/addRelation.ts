import { Database, ObjectId } from "../../deps.ts";
import { createProjection } from "../../models/createProjection.ts";
import { IRelationsFileds, schemaFns, TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/throwError.ts";
import { Projection } from "../aggregation/type.ts";
import { TInsertRelations } from "../insert/insertOne.ts";
import { handleMultiRelation } from "../utils/insert/handleMultiRelation.ts";
import { handleSingleRelation } from "../utils/insert/handleSingleRelation.ts";

export const addRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  _id,
  relations,
  projection,
  replace,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  _id: ObjectId;
  relations: TInsertRelations<TR>;
  projection?: Projection;
  replace?: boolean;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const foundedDoc = await db.collection(collection).findOne({ _id });

  if (foundedDoc) {
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
          if (foundedDoc[rel] && replace === undefined || replace === false) {
            throwError(
              `the ${rel} relation is already added if you want to replaced this please add replace option`,
            );
          }
          await handleSingleRelation({
            db,
            relations,
            rel,
            foundedSchema,
            pureRelProjection,
            pureDocProjection,
            generatedDoc,
            replace,
          });
          console.log("in handle single relation : ", {
            generatedDoc,
            rel,
            foundedRel: generatedDoc[rel],
          });
          await db.collection(collection).updateOne({ _id: foundedDoc._id }, {
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
        }

        await db.collection(collection).updateOne({ _id: foundedDoc._id }, {
          $addToSet: { [rel]: { $each: generatedDoc[rel] } },
        });
      }
    }
  } else {
    throwError("can not find this document");
  }
};
