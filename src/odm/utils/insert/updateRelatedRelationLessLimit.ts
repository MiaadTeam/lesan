import { Bson, Database, ObjectId } from "../../../deps.ts";
import { TRelatedRelation } from "../../../mod.ts";
import { pushRelatedRelation } from "./pushRelatedRelations.ts";
import { updateRelatedRelationNumeric } from "./updateRelatedRelationNumeric.ts";

export const updateRelatedRelationLessLimit = async ({
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
  relation: TRelatedRelation;
  db: Database;
  existRelation: Record<string, any>[];
  newNumber: number;
  fieldName: string;
  collection: string;
  updateKeyName: string;
  updateId: ObjectId;
  updatedDoc: Bson.Document;
}) => {
  return relation.sort!.order === "asc"
    ? relation.sort!.type === "number"
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
    : relation.sort!.type === "number"
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
