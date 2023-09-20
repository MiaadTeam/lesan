import { handleMultiRelation } from "./handleMultiRelation.ts";
import { handleSingleRelation } from "./handleSingleRelation.ts";

export const handleInsertOne = async ({
  db,
  relations,
  rel,
  foundedSchema,
  pureProjection,
  generatedDoc,
  newObjId,
  doc,
}: {
  db: any;
  relations: any;
  rel: any;
  foundedSchema: any;
  pureProjection: any;
  generatedDoc: any;
  newObjId: any;
  doc: any;
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
