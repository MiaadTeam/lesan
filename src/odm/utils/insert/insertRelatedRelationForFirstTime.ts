import { Bson } from "../../../deps.ts";
import { ObjectId } from "../../../deps.ts";
import { Database } from "../../../deps.ts";
import { RelationDataType } from "../../../mod.ts";

export const insertRelatedRelationForFirstTime = async ({
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
  const updatedRel = await db.collection(collection).updateOne(
    {
      _id: updateId,
    },
    {
      $set: { [updateKeyName]: type === "single" ? updatedDoc : [updatedDoc] },
    },
  );

  return updatedRel;
};
