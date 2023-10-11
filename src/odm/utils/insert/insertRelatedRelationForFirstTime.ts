import { RelationDataType } from "../../../mod.ts";
import { Db, Document, ObjectId } from "../../../npmDeps.ts";

export const insertRelatedRelationForFirstTime = async ({
  db,
  collection,
  updateKeyName,
  updateId,
  updatedDoc,
  type,
}: {
  db: Db;
  collection: string;
  updateKeyName: string;
  updateId: ObjectId;
  updatedDoc: Document;
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
