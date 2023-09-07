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
import { find } from "../find/find.ts";
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

const proccessRelatedRelation = async ({
  db,
  relatedRelation,
  relatedRel,
  lengthOfRel,
  fieldName,
  updateId,
  updatedDoc,
  collection,
  doc,
  foundedSingleMainRelation,
  foundedSchema,
  rel,
  newObjId,
}: {
  db: any;
  relatedRelation: any;
  lengthOfRel: number;

  fieldName: string;
  collection: string;
  relatedRel: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;

  doc: any;
  foundedSingleMainRelation: any;
  foundedSchema: any;
  rel: any;
  newObjId: ObjectId;
}) => {
  if (relatedRelation.limit) {
    if (!relatedRelation.sort) {
      throwError("you most be set sort field");
    }
    if (relatedRelation.type !== "multiple") {
      throwError("you most be set relation type to multiple");
    }

    if (lengthOfRel < relatedRelation.limit!) {
      await updateRelatedRelationLessLimit({
        relation: relatedRelation,
        db,
        updateKeyName: relatedRel,
        existRelation: foundedSingleMainRelation![relatedRel],
        newNumber: doc[fieldName],
        fieldName,
        collection,
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
              updateKeyName: relatedRel,
              lastRelationValue: foundedSingleMainRelation![relatedRel][
                foundedSingleMainRelation![relatedRel].length - 1
              ][fieldName],
              lenghtOfRelation: foundedSingleMainRelation![relatedRel].length,
            },
          );
          if (
            doc[fieldName] <=
              foundedSingleMainRelation![relatedRel][
                lengthOfRel - 1
              ][fieldName]
          ) {
            await updateRelatedRelationNumeric({
              db,
              updateKeyName: relatedRel,
              existRelation: foundedSingleMainRelation![relatedRel],
              newNumber: doc[fieldName],
              fieldName,
              collection,
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
              foundedSingleMainRelation![relatedRel][
                lengthOfRel - 1
              ][fieldName],
          });
          if (
            doc[fieldName] >=
              foundedSingleMainRelation![relatedRel][
                lengthOfRel - 1
              ][fieldName]
          ) {
            await updateRelatedRelationNumeric({
              db,
              updateKeyName: relatedRel,
              existRelation: foundedSingleMainRelation![relatedRel],
              newNumber: doc[fieldName],
              fieldName,
              collection,
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
            collection,
            updateKeyName: relatedRel,
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
        updateKeyName: relatedRel,
        updateId: foundedSingleMainRelation!._id,
        updatedDoc: { _id: newObjId, ...doc },
        type: foundedSchema.relations[rel].relatedRelations[relatedRel]
          .type,
      });
    } else {
      await updateRelatedRelationLessLimit({
        relation: relatedRelation,
        db,
        updateKeyName: relatedRel,
        existRelation: foundedSingleMainRelation![relatedRel],
        newNumber: doc[relatedRelation.sort!.field],
        fieldName: relatedRelation.sort!.field,
        collection,
        updateId: foundedSingleMainRelation!._id,
        updatedDoc: { _id: newObjId, ...doc },
      });
    }
  }
};

const handleMultiRelation = async ({
  db,
  foundedSchema,
  relations,
  rel,
  pureProjection,
  generatedDoc,
  newObjId,
  doc,
}: {
  db: any;
  foundedSchema: any;
  relations: any;
  rel: any;
  pureProjection: any;
  generatedDoc: any;
  newObjId: any;
  doc: any;
}) => {
  const foundedMultiMainRelation = await find({
    db,
    collection: foundedSchema.relations[rel].schemaName,
    filters: { _id: { "$in": relations![rel]._ids } },
  }).toArray();

  if (!foundedMultiMainRelation) {
    throwError(`can not find this relatation : ${rel}`);
  }

  if (
    foundedMultiMainRelation.length !==
      (relations![rel]._ids as ObjectId[]).length
  ) {
    throwError(`we have problem with this relatation : ${rel}`);
  }

  const filterByObject = (
    array: Record<string, any>[],
    filter: object,
  ) => {
    const filtered: Record<string, any>[] = [];
    for (const obj of array) {
      const newObj: Record<string, any> = {};
      for (const key in filter) {
        newObj[key] = obj[key];
      }
      filtered.push(newObj);
    }
    return filtered;
  };

  const pureOfFoundedMultiMainRelation = filterByObject(
    foundedMultiMainRelation,
    pureProjection,
  );

  generatedDoc[`${rel}`] = pureOfFoundedMultiMainRelation;

  for (
    const relatedRel in foundedSchema.relations[rel]
      .relatedRelations
  ) {
    const relatedRelation =
      foundedSchema.relations[rel].relatedRelations[relatedRel];
    const relationSchemName = foundedSchema.relations[rel].schemaName;
    const updatedDoc = { _id: newObjId, ...doc };
    const fieldName = relatedRelation.sort ? relatedRelation.sort.field : "";
    foundedMultiMainRelation.forEach(async (FMR) => {
      if (
        relations && relations[rel] && relations[rel].relatedRelations &&
        relations[rel].relatedRelations![relatedRel] === true
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
            updatedDoc,
            collection: relationSchemName,
            doc,
            foundedSingleMainRelation: FMR,
            foundedSchema,
            rel,
            newObjId,
          });
        } else {
          await insertRelatedRelationForFirstTime({
            db,
            collection: foundedSchema.relations[rel].schemaName,
            updateKeyName: relatedRel,
            updateId: FMR._id,
            updatedDoc: { _id: newObjId, ...doc },
            type: foundedSchema.relations[rel].relatedRelations[relatedRel]
              .type,
          });
        }
      }
    });
  }
};

const handleSingleRelation = async ({
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

export type TInsertRelations = {
  [key: string]: {
    _ids: ObjectId | ObjectId[];
    relatedRelations?: {
      [key: string]: boolean;
    };
  };
};

const handleInsertOne = async ({
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
  if (foundedSchema.relations[rel].type === "single") {
    await handleSingleRelation({
      db,
      relations,
      rel,
      foundedSchema,
      pureProjection,
      generatedDoc,
      newObjId,
      doc,
    });
  } else {
    console.log("inside multi main relations", {
      foundedSchema,
      relations,
    });

    await handleMultiRelation({
      db,
      foundedSchema,
      relations,
      rel,
      pureProjection,
      generatedDoc,
      newObjId,
      doc,
    });
  }
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
  relations?: TInsertRelations;
  options?: InsertOptions;
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

  // allan bayad ham ba senatio QQ pish beram ham senario somthing is wrong:: aval ye generatedDoc besazam baad hame relationharo peyda konam berizam to ye done arraye ba noe relationha baad age hamechi dorost bood QQ ro start bezanam baad relationharo brooz konam baad insert document to bezanam va baad QQ isFinished ro true konam

  let somethingIsWrong = false;
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
          newObjId,
          doc,
        });
      }
    } else {
      if (relations === undefined || relations[rel] === undefined) {
        throwError(`can not find this relatation : ${rel}`);
      }
      await handleInsertOne({
        db,
        relations,
        rel,
        foundedSchema,
        pureProjection,
        generatedDoc,
        newObjId,
        doc,
      });
    }
  }

  await db.collection(collection).insertOne(generatedDoc, options);

  return generatedDoc;
};
