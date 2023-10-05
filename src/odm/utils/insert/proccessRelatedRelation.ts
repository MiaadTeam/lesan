import { Bson, Database, InsertDocument, ObjectId } from "../../../deps.ts";
import { IModel, TRelatedRelation } from "../../../mod.ts";
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
  foundedSingleMainRelation,
  foundedSchema,
  rel,
}: {
  db: Database;
  relatedRelation: TRelatedRelation;
  lengthOfRel: number;
  fieldName: string;
  collection: string;
  relatedRel: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;
  rel: string;
  foundedSchema: IModel;
  foundedSingleMainRelation: Bson.Document;
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
        newNumber: updatedDoc[fieldName],
        fieldName,
        collection,
        updateId,
        updatedDoc,
      });
    } else {
      if (relatedRelation.sort!.order === "asc") {
        if (relatedRelation.sort!.type === "number") {
          if (
            updatedDoc[fieldName] <=
              foundedSingleMainRelation![relatedRel][
                lengthOfRel - 1
              ][fieldName]
          ) {
            await updateRelatedRelationNumeric({
              db,
              updateKeyName: relatedRel,
              existRelation: foundedSingleMainRelation![relatedRel],
              newNumber: updatedDoc[fieldName],
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
          if (
            updatedDoc[fieldName] >=
              foundedSingleMainRelation![relatedRel][
                lengthOfRel - 1
              ][fieldName]
          ) {
            await updateRelatedRelationNumeric({
              db,
              updateKeyName: relatedRel,
              existRelation: foundedSingleMainRelation![relatedRel],
              newNumber: updatedDoc[fieldName],
              fieldName,
              collection,
              updateId,
              updatedDoc,
              type: "desc",
              pop: "last",
            });
          }
        } else {
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
        updatedDoc,
        type: foundedSchema.relations[rel].relatedRelations[relatedRel]
          .type,
      });
    } else {
      await updateRelatedRelationLessLimit({
        relation: relatedRelation,
        db,
        updateKeyName: relatedRel,
        existRelation: foundedSingleMainRelation![relatedRel],
        newNumber: updatedDoc[relatedRelation.sort!.field],
        fieldName: relatedRelation.sort!.field,
        collection,
        updateId: foundedSingleMainRelation!._id,
        updatedDoc,
      });
    }
  }
};
