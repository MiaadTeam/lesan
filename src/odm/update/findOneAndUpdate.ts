import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import {
  Db,
  Document,
  Filter,
  FindOneAndUpdateOptions,
  UpdateFilter,
} from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";

export const findOneAndUpdate = async <PureFields extends Document = Document>(
  { db, collection, filter, update, options, projection, schemasObj }: {
    db: Db;
    schemasObj: TSchemas;
    collection: string;
    filter: Filter<PureFields>;
    update: UpdateFilter<PureFields>;
    options?: FindOneAndUpdateOptions & {
      includeResultMetadata: true;
    };
    projection: Document;
  },
) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const pureDocProjection = createProjection(
    schemasObj,
    collection,
    "Pure",
  );
  const updatedDoc = await db.collection(collection).findOneAndUpdate(
    filter as Filter<Document>,
    update as UpdateFilter<Document>,
    {
      ...options,
      projection: pureDocProjection,
      returnDocument: "after",
      includeResultMetadata: true,
    },
  );
  console.log("updatedDoc ", { updatedDoc, pureDocProjection });
  if (
    updatedDoc.lastErrorObject?.updatedExisting === false ||
    updatedDoc.lastErrorObject?.n <= 0
  ) {
    throwError("can not update this doc");
  }

  const schemaRelatedToThis = new Set<string>();

  for (const relatedRel in foundedSchema.relatedRelations) {
    schemaRelatedToThis.add(
      foundedSchema.relatedRelations[relatedRel].schemaName,
    );
  }

  for (const schema of schemaRelatedToThis) {
    const foundRelatedSchema = schemaFns(schemasObj).getSchema(schema);
    // console.log({ schema, foundRelatedSchema });
    for (const relation in foundRelatedSchema.relations) {
      if (foundRelatedSchema.relations[relation].schemaName === collection) {
        console.log({
          foundRelatedSchemaMainRelationFound:
            foundRelatedSchema.relations[relation],
          relation,
        });
        // TODO shayad chand bar mainRelation dade bashe ba in schema : pas bayad ye update aggregation benevisam
        if (foundRelatedSchema.relations[relation].type === "single") {
          await db.collection(schema).updateMany({
            [`${relation}._id`]: updatedDoc.value!._id,
          }, { $set: { [relation]: updatedDoc.value } });
        }
      }
    }
  }

  return updatedDoc;
};
