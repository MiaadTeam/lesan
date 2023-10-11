import {
  Db,
  Document,
  InsertOneOptions,
  ObjectId,
  OptionalUnlessRequiredId,
} from "../../npmDeps.ts";
import { IRelationsFileds } from "../../mod.ts";
import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { handleInsertOne } from "../utils/insert/mod.ts";

export type TInsertRelations<T extends IRelationsFileds> = {
  [mainKey in keyof T]?: {
    _ids: ObjectId | ObjectId[];
    relatedRelations?: {
      [key in keyof T[mainKey]["relatedRelations"]]: boolean;
    };
  };
};

export const insertOne = async <
  TR extends IRelationsFileds,
  PureFields extends Document,
>({
  db,
  schemasObj,
  collection,
  doc,
  relations,
  options,
  projection,
}: {
  db: Db;
  schemasObj: TSchemas;
  collection: string;
  doc: OptionalUnlessRequiredId<PureFields>;
  relations?: TInsertRelations<TR>;
  options?: InsertOneOptions;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const populatedMainRelations = [];

  const newObjId = new ObjectId();

  const generatedDoc: Record<string, any> = { _id: newObjId, ...doc };

  const insertedQQ = await db.collection("QQ").insertOne({
    type: "insertOne",
    isFinished: false,
    insertedId: generatedDoc._id,
    collection,
    relations,
    options,
    schema: foundedSchema,
  });
  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );

  // allan bayad ham ba senatio QQ pish beram ham senario somthing is wrong:: aval ye generatedDoc besazam baad hame relationharo peyda konam berizam to ye done arraye ba noe relationha baad age hamechi dorost bood QQ ro start bezanam baad relationharo brooz konam baad insert document to bezanam va baad QQ isFinished ro true konam

  let somethingIsWrong = false;
  for (const rel in foundedSchema.relations) {
    const pureRelProjection = createProjection(
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
          pureRelProjection,
          pureDocProjection,
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
          pureRelProjection,
          pureDocProjection,
          generatedDoc,
        });
      } else {
        throwError(`can not find this relatation : ${rel}`);
      }
    }
  }

  await db.collection(collection).insertOne(generatedDoc, options);

  return generatedDoc;
};
