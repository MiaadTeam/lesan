import {
  Bson,
  Database,
  InsertDocument,
  InsertOptions,
  ObjectId,
} from "../../deps.ts";
import { createProjection } from "../../models/createProjection.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { create, object } from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { aggregation } from "../find/aggregation.ts";
import { find } from "../find/find.ts";
import { findOne } from "../find/findOne.ts";
import { addOutrelation, checkRelation } from "../mod.ts";

export const insertOne = async ({
  db,
  schemasObj,
  collection,
  doc,
  relations,
  options,
  projection,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  doc: InsertDocument<Bson.Document>;
  relations?: Record<string, ObjectId | ObjectId[]>;
  options?: InsertOptions;
  projection?: Projection;
}) => {
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);

  const populatedMainRelations = [];

  let somthingIsWrong = false;
  for (const rel in foundedSchema.relations) {
    if (
      foundedSchema.relations[rel].optional === false &&
      relations![rel] === undefined
    ) {
      somthingIsWrong = true;
    }
    const pureProjection = createProjection(
      schemasObj,
      foundedSchema.relations[rel].schemaName,
      "Pure",
    );

    if (Array.isArray(relations![rel])) {
      const foundedMainRelations = await find({
        db,
        collection: foundedSchema.relations[rel].schemaName,
        filters: { _id: { $in: relations![rel] } },
        projection: pureProjection as Projection,
      }).toArray();
      populatedMainRelations.push({
        ...foundedSchema.relations[rel],
        relationName: rel,
        populatedRelation: foundedMainRelations,
      });
    }
    if (typeof relations![rel] === "string") {
      const foundedMainRelation = await findOne(
        {
          db,
          collection: foundedSchema.relations[rel].schemaName,
          filters: { _id: relations![rel] },
          projection: pureProjection as Projection,
        },
      );
      populatedMainRelations.push({
        ...foundedSchema.relations[rel],
        relationName: rel,
        populatedRelation: foundedMainRelation,
      });
    }
  }

  return {};
};
