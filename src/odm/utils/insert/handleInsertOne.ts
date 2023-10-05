import { Database } from "../../../deps.ts";
import { IModel, IRelationsFileds } from "../../../mod.ts";
import { TInsertRelations } from "../../insert/insertOne.ts";
import { handleMultiRelation } from "./handleMultiRelation.ts";
import { handleSingleRelation } from "./handleSingleRelation.ts";

export const handleInsertOne = async <TR extends IRelationsFileds>({
  db,
  relations,
  rel,
  foundedSchema,
  pureRelProjection,
  pureDocProjection,
  generatedDoc,
}: {
  db: Database;
  relations: TInsertRelations<TR>;
  rel: string;
  foundedSchema: IModel;
  pureRelProjection: Record<string, any>;
  pureDocProjection: Record<string, any>;
  generatedDoc: Record<string, any>;
}) => {
  if (foundedSchema.relations[rel].type === "single") {
    await handleSingleRelation({
      db,
      relations,
      rel,
      foundedSchema,
      pureDocProjection,
      pureRelProjection,
      generatedDoc,
    });
  } else {
    await handleMultiRelation({
      db,
      foundedSchema,
      relations,
      rel,
      pureDocProjection,
      pureRelProjection,
      generatedDoc,
    });
  }
};
