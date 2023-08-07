import {
  Bson,
  Database,
  InsertDocument,
  InsertOptions,
  ObjectId,
} from "../../deps.ts";
import { schemaFns, TSchemas } from "../../models/mod.ts";
import { create, object } from "../../npmDeps.ts";
import { throwError } from "../../utils/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { aggregation } from "../find/aggregation.ts";
import { findOnePure } from "../find/findOnePure.ts";
import { findPure } from "../find/findPure.ts";
import { addOutrelation, checkRelation } from "../mod.ts";

export const insertOne = async ({
  db,
  schemasObj,
  collection,
  doc,
  relation,
  options,
  get,
}: {
  db: Database;
  schemasObj: TSchemas;
  collection: string;
  doc: InsertDocument<Bson.Document>;
  relation?: Record<string, ObjectId | ObjectId[]>;
  options?: InsertOptions;
  get?: Projection;
}) => {
  const pureInrelSchema = schemaFns(schemasObj).getPureOfMainRelations(
    collection,
  );
  const foundedSchema = schemaFns(schemasObj).getSchema(collection);
  const inrelationObj =
    schemaFns(schemasObj).getSchema(collection).mainRelations;

  const checkRelationTypeAndAddInRelation = async (key: string) => {
    if (!Array.isArray(relation![key])) {
      const res = await findOnePure(
        db,
        schemasObj,
        inrelationObj[key].schemaName,
        {
          _id: relation![key],
        },
      );
      doc[key] = res;
    } else {
      const res = await findPure(
        db,
        schemasObj,
        inrelationObj[key].schemaName,
        {
          _id: { $in: relation![key] },
        },
      );
      doc[key] = res;
    }
  };

  if (relation) {
    for (const key in inrelationObj) {
      if (inrelationObj[key].optional === false) {
        await checkRelationTypeAndAddInRelation(key);
      } else {
        if (
          key &&
          relation[key]
        ) {
          await checkRelationTypeAndAddInRelation(key);
        }
      }
    }
  }

  create(doc, object(pureInrelSchema));

  doc = addOutrelation(collection, doc, foundedSchema);

  doc._id = db
    ? await db.collection(collection).insertOne(doc, options)
    : throwError("No database connection");

  checkRelation(collection, inrelationObj, schemasObj, doc, db);

  const getAggregation = async () =>
    await aggregation({
      db,
      schemasObj,
      collection,
      pipline: [{ $match: { _id: doc._id } }],
      get,
    });

  return get ? await getAggregation() : doc._id;
};
