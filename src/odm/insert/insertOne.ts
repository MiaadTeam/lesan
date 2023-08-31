import {
  Bson,
  Database,
  InsertDocument,
  InsertOptions,
  ObjectId,
} from "../../deps.ts";
import { RelationDataType } from "../../mod.ts";
import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { getNumericPosition } from "../../utils/getNumericPosition.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { findOne } from "../find/findOne.ts";

const insertRelatedRelationForFirstTime = async ({
  db,
  collection,
  updateKeyName,
  updateId,
  updatedDoc,
  type,
}: {
  db: Database;
  collection: string;
  updateKeyName: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;
  type: RelationDataType;
}) => {
  console.log(
    "inside insertRelatedRelationForFirstTime and we gonna to update",
  );
  const updatedRel = await db.collection(collection).updateOne(
    {
      _id: updateId,
    },
    {
      $set: { [updateKeyName]: type === "single" ? updatedDoc : [updatedDoc] },
    },
  );

  console.log("updatedRel", updatedRel, collection);
  return updatedRel;
};

const pushRelatedRelation = async ({
  db,
  collection,
  updateKeyName,
  updateId,
  updatedDoc,
  poshToTop,
  popLast,
}: {
  db: Database;
  collection: string;
  updateId: ObjectId;
  updateKeyName: string;
  updatedDoc: Bson.Document;
  poshToTop: boolean;
  popLast?: boolean;
}) => {
  const updateCommand: Record<string, Bson.Document> = {
    $push: { [updateKeyName]: { $each: [updatedDoc] } },
  };
  poshToTop && (updateCommand["$push"][updateKeyName]["$position"] = 0);
  // popLast && (updateCommand["$pop"] = { [updateKeyName]: 1 });
  const updatedRel = await db.collection(collection).updateOne(
    {
      _id: updateId,
    },
    { ...updateCommand },
  );

  popLast &&
    (await db.collection(collection).updateOne(
      { _id: updateId },
      {
        $pop: { [updateKeyName]: 1 },
      },
    ));

  return updatedRel;
};

const updateRelatedRelationNumeric = async ({
  db,
  existRelation,
  newNumber,
  fieldName,
  collection,
  updateKeyName,
  updateId,
  updatedDoc,
  type,
  pop,
}: {
  db: Database;
  existRelation: Record<string, any>[];
  newNumber: number;
  fieldName: string;
  collection: string;
  updateKeyName: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;
  type: "asc" | "desc";
  pop?: "first" | "last" | null;
}) => {
  const position = getNumericPosition(
    existRelation,
    newNumber,
    fieldName,
    type,
  );
  const updatedRel = await db.collection(collection).updateOne(
    {
      _id: updateId,
    },
    {
      $push: {
        [updateKeyName]: {
          $each: [updatedDoc],
          $position: position,
        },
      },
    },
  );
  pop &&
    (await db.collection(collection).updateOne(
      { _id: updateId },
      {
        $pop: { [updateKeyName]: pop === "first" ? -1 : 1 },
      },
    ));
  console.log("updateRelatedRelationNumeric", {
    updatedRel,
    existRelation,
    newNumber,
    fieldName,
    collection,
    updateKeyName,
    updateId,
    updatedDoc,
    type,
    position,
  });
  return updatedRel;
};

const updateRelatedRelationLessLimit = async ({
  relation,
  db,
  existRelation,
  newNumber,
  fieldName,
  collection,
  updateKeyName,
  updateId,
  updatedDoc,
}: {
  relation: any;
  db: Database;
  existRelation: Record<string, any>[];
  newNumber: number;
  fieldName: string;
  collection: string;
  updateKeyName: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;
}) => {
  console.log("updateRelatedRelationLessLimit", {
    relation,
    existRelation,
    newNumber,
    fieldName,
    collection,
    updateKeyName,
    updateId,
    updatedDoc,
  });
  return relation.sort.order === "asc"
    ? relation.sort.type === "number"
      ? await updateRelatedRelationNumeric({
        db,
        existRelation,
        newNumber,
        fieldName,
        collection,
        updateKeyName,
        updateId,
        updatedDoc,
        type: "asc",
      })
      : await pushRelatedRelation({
        db,
        collection,
        updateId,
        updateKeyName,
        updatedDoc,
        poshToTop: false,
      })
    : relation.sort.type === "number"
    ? await updateRelatedRelationNumeric({
      db,
      existRelation,
      newNumber,
      fieldName,
      collection,
      updateKeyName,
      updateId,
      updatedDoc,
      type: "desc",
    })
    : await pushRelatedRelation({
      db,
      collection,
      updateId,
      updateKeyName,
      updatedDoc,
      poshToTop: true,
    });
};

export const insertOne = async ({
  db,
  schemasObj,
  collection,
  doc,
  relations,
  options,
  projection,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  doc: InsertDocument<Bson.Document>;
  relations?: Record<string, ObjectId | ObjectId[]>;
  options?: InsertOptions;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const populatedMainRelations = [];

  const _id = new ObjectId();

  const generatedDoc: Record<string, any> = { _id, ...doc };

  const insertedQQ = await db.collection("QQ").insertOne({
    type: "insertOne",
    isFinished: false,
    insertedId: generatedDoc._id,
    collection,
    relations,
    options,
    schema: foundedSchema,
  });

  // allan bayad ham ba senatio QQ pish beram ham senario somthing is wrong:: aval ye generatedDoc besazam baad hame relationharo peyda konam berizam to ye done arraye ba noe relationha baad age hamechi dorost bood QQ ro start bezanam baad relationharo brooz konam baad insert document to bezanam va baad QQ isFinished ro true konam

  let somethingIsWrong = false;
  for (const rel in foundedSchema.relations) {
    const pureProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
    );

    if (foundedSchema.relations[rel].optional) {
      // TODO we do not completed here ... should be check if it exists do anything its needs
      if (foundedSchema.relations[rel].type === "single") {
        const foundedSingleRelation = await findOne({
          db,
          collection: foundedSchema.relations[rel].schemaName,
          filters: { _id: relations![rel] },
          projection: pureProjection,
        });
      }
    } else {
      if (relations![rel] === undefined) {
        throwError(`can not find this relatation : ${relations![rel]}`);
      }

      if (foundedSchema.relations[rel].type === "single") {
        const foundedSingleMainRelation = await findOne({
          db,
          collection: foundedSchema.relations[rel].schemaName,
          filters: { _id: relations![rel] },
        });

        if (!foundedSingleMainRelation) {
          throwError(`can not find this relatation : ${relations![rel]}`);
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
          let foundRelatedRel = [];

          const updateKeyName =
            foundedSchema.relations[rel].relatedRelations[relatedRel].name;
          const relatedRelation =
            foundedSchema.relations[rel].relatedRelations[relatedRel];
          const relationSchemName = foundedSchema.relations[rel].schemaName;
          const lengthOfRel = foundedSingleMainRelation![relatedRelation.name]
            ? foundedSingleMainRelation![relatedRelation.name].length
            : 0;
          const updateId = foundedSingleMainRelation!._id;
          const updatedDoc = { _id, ...doc };
          const fieldName = relatedRelation.sort
            ? relatedRelation.sort.field
            : "";

          if (foundedSingleMainRelation![relatedRelation.name]) {
            if (relatedRelation.limit) {
              if (!relatedRelation.sort) {
                throwError("you most be set sort field");
              }

              if (lengthOfRel < relatedRelation.limit!) {
                await updateRelatedRelationLessLimit({
                  relation: relatedRelation,
                  db,
                  updateKeyName,
                  existRelation: foundedSingleMainRelation![updateKeyName],
                  newNumber: doc[fieldName],
                  fieldName,
                  collection: relationSchemName,
                  updateId,
                  updatedDoc,
                });
              } else {
                if (relatedRelation.sort!.order === "asc") {
                  if (relatedRelation.sort!.type === "number") {
                    console.log(
                      "--- ==>> inside limit and with asc sort order and type is numeric",
                      {
                        relatedRelation,
                        fieldValue: doc[fieldName],
                        updateKeyName,
                        lastRelationValue:
                          foundedSingleMainRelation![updateKeyName][
                            foundedSingleMainRelation![updateKeyName].length - 1
                          ][fieldName],
                        lenghtOfRelation:
                          foundedSingleMainRelation![updateKeyName].length,
                      },
                    );
                    if (
                      doc[fieldName] <=
                        foundedSingleMainRelation![updateKeyName][
                          lengthOfRel - 1
                        ][fieldName]
                    ) {
                      await updateRelatedRelationNumeric({
                        db,
                        updateKeyName,
                        existRelation:
                          foundedSingleMainRelation![updateKeyName],
                        newNumber: doc[fieldName],
                        fieldName,
                        collection: relationSchemName,
                        updateId,
                        updatedDoc,
                        type: "asc",
                        pop: "last",
                      });
                    }
                  }
                } else {
                  if (relatedRelation.sort!.type === "number") {
                    console.log("--- ==>> inside desc and sort type is num ", {
                      relatedRelation,
                      docField: doc[fieldName],
                      foundedSingleMainRelationField:
                        foundedSingleMainRelation![updateKeyName][
                          lengthOfRel - 1
                        ][fieldName],
                    });
                    if (
                      doc[fieldName] >=
                        foundedSingleMainRelation![updateKeyName][
                          lengthOfRel - 1
                        ][fieldName]
                    ) {
                      await updateRelatedRelationNumeric({
                        db,
                        updateKeyName,
                        existRelation:
                          foundedSingleMainRelation![updateKeyName],
                        newNumber: doc[fieldName],
                        fieldName,
                        collection: relationSchemName,
                        updateId,
                        updatedDoc,
                        type: "desc",
                        pop: "last",
                      });
                    }
                  } else {
                    console.log(
                      "--- ==>> inside desc and not num ",
                      relatedRelation,
                    );
                    await pushRelatedRelation({
                      db,
                      collection: relationSchemName,
                      updateKeyName,
                      updateId,
                      updatedDoc,
                      poshToTop: true,
                      popLast: true,
                    });
                  }
                }
              }
            } else {
              if (relatedRelation.type === "single") {
                await insertRelatedRelationForFirstTime({
                  db,
                  collection: foundedSchema.relations[rel].schemaName,
                  updateKeyName:
                    foundedSchema.relations[rel].relatedRelations[relatedRel]
                      .name,
                  updateId: foundedSingleMainRelation!._id,
                  updatedDoc: { _id, ...doc },
                  type:
                    foundedSchema.relations[rel].relatedRelations[relatedRel]
                      .type,
                });
              } else {
                await updateRelatedRelationLessLimit({
                  relation: relatedRelation,
                  db,
                  updateKeyName,
                  existRelation: foundedSingleMainRelation![updateKeyName],
                  newNumber: doc[relatedRelation.sort!.field],
                  fieldName: relatedRelation.sort!.field,
                  collection: relationSchemName,
                  updateId: foundedSingleMainRelation!._id,
                  updatedDoc: { _id, ...doc },
                });
              }
            }
          } else {
            await insertRelatedRelationForFirstTime({
              db,
              collection: foundedSchema.relations[rel].schemaName,
              updateKeyName:
                foundedSchema.relations[rel].relatedRelations[relatedRel].name,
              updateId: foundedSingleMainRelation!._id,
              updatedDoc: { _id, ...doc },
              type:
                foundedSchema.relations[rel].relatedRelations[relatedRel].type,
            });
          }
        }
      } else {
        console.log("inside multi main relations", { foundedSchema });
      }
    }
  }

  await db.collection(collection).insertOne(generatedDoc, options);

  return generatedDoc;
};
