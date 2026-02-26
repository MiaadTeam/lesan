import { TRelatedRelation } from "../../../../mod.ts";
import { Db, Document, ObjectId } from "../../../../npmDeps.ts";
import { throwError } from "../../../utils/mod.ts";
import { generateUpdateFilter } from "../generateUpdateFilter.ts";

export const proccessRelatedRelation = async ({
  db,
  relatedRelation,
  relatedRel,
  updateId,
  updatedDoc,
  collection,
}: {
  db: Db;
  relatedRelation: TRelatedRelation;
  collection: string;
  relatedRel: string;
  updateId: ObjectId;
  updatedDoc: Document;
}) => {
  if (relatedRelation.limit) {
    if (!relatedRelation.sort) {
      throwError("you most be set sort field");
    }
    if (relatedRelation.type !== "multiple") {
      throwError("you most be set relation type to multiple");
    }
  }

  const updateFilter = generateUpdateFilter({
    relatedRelation,
    relatedRel,
    updatedDoc,
  });

  const updatedRel = await db.collection(collection).updateOne(
    {
      _id: updateId,
    },
    updateFilter,
  );

  return updatedRel;
};
