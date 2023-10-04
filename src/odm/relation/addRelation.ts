import { Database, ObjectId } from "../../deps.ts";
import { createProjection } from "../../models/createProjection.ts";
import { IRelationsFileds, schemaFns, TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/throwError.ts";
import { Projection } from "../aggregation/type.ts";
import { TInsertRelations } from "../insert/insertOne.ts";
import { handleInsertOne } from "../utils/insert/handleInsertOne.ts";

export const addRelation = async <TR extends IRelationsFileds>({
  db,
  schemasObj,
  collection,
  _id,
  relations,
  projection,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  _id: ObjectId;
  relations: TInsertRelations<TR>;
  projection?: Projection;
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

    for (const rel in foundedSchema.relations) {
      const pureProjection = createProjection(
        schemasObj,
        foundedSchema.relations[rel].schemaName,
        "Pure",
      );

      if (foundedSchema.relations[rel].optional) {
        if (relations && relations[rel]) {
          await handleInsertOne({
            db,
            relations,
            rel,
            foundedSchema,
            pureProjection,
            generatedDoc,
          });
        }
      } else {
        if (relations && relations[rel]) {
          await handleInsertOne({
            db,
            relations,
            rel,
            foundedSchema,
            pureProjection,
            generatedDoc,
          });
        } else {
          throwError(`can not find this relatation : ${rel}`);
        }
      }
    }
  } else {
    throwError("can not find this document");
  }
};
