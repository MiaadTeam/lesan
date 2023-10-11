import { Bson, Database, ObjectId } from "../../../deps.ts";
import { getNumericPosition } from "../../../utils/getNumericPosition.ts";

export const updateRelatedRelationNumeric = async ({
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
      $addToSet: {
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
  return updatedRel;
};
