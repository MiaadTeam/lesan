export const pushRelatedRelation = async ({
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
