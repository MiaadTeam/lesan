import { Bson, Database, InsertDocument } from "../../../deps.ts";
import { IModel, IRelationsFileds } from "../../../mod.ts";
import { TInsertRelations } from "../../insert/insertOne.ts";
import { handleMultiRelation } from "./handleMultiRelation.ts";
import { handleSingleRelation } from "./handleSingleRelation.ts";

export const handleInsertOne = async <TR extends IRelationsFileds>({
  db,
  relations,
  rel,
  foundedSchema,
  pureProjection,
  generatedDoc,
  newObjId,
  doc,
}: {
  db: Database;
  relations: TInsertRelations<TR>;
  rel: string;
  foundedSchema: IModel;
  pureProjection: Record<string, any>;
  generatedDoc: Record<string, any>;
  newObjId: Bson.ObjectId;
  doc: InsertDocument<Bson.Document>;
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
