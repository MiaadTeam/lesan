import { Bson, ObjectId } from "../../../deps.ts";
import { throwError } from "../../../utils/mod.ts";
import { insertRelatedRelationForFirstTime } from "./insertRelatedRelationForFirstTime.ts";
import { pushRelatedRelation } from "./pushRelatedRelations.ts";
import { updateRelatedRelationLessLimit } from "./updateRelatedRelationLessLimit.ts";
import { updateRelatedRelationNumeric } from "./updateRelatedRelationNumeric.ts";

export const proccessRelatedRelation = async ({
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
