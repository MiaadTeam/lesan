import {
  assert,
  Bson,
  Database,
  enums,
  Filter,
  InsertDocument,
  InsertOptions,
  UpdateFilter,
  UpdateOptions,
} from "../deps.ts";
import { InRelation, ISchema, OutRelation, PureModel } from "../models/mod.ts";
import { schemaFns } from "../models/schema.ts";
import { throwError } from "../utils/throwError.ts";

export const odm = (schemasObj: ISchema) => {
  let mongoDb: Database;

  const setDb = (db: Database) => (mongoDb = db);

  const getDbClinet = () => mongoDb;

  const getCollection = (collection: string) => {
    const db = getDbClinet();
    const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
    assert(collection, getSchemas);
    return db
      ? db.collection(collection)
      : throwError("No database connection");
  };

  const findData = async (collection: string, query: Bson.Document) => {
    const db = getDbClinet();
    const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
    assert(collection, getSchemas);
    return db
      ? await db.collection(collection).find(query).toArray()
      : throwError("No database connection");
  };

  const findOneData = async (collection: string, query: Bson.Document) => {
    const db = getDbClinet();
    const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
    assert(collection, getSchemas);
    return db
      ? await db.collection(collection).findOne(query)
      : throwError("No database connection");
  };

  const insertOneData = async (
    collection: string,
    doc: InsertDocument<Bson.Document>,
    options?: InsertOptions
  ) => {
    const db = getDbClinet();
    return db
      ? await db.collection(collection).insertOne(doc, options)
      : throwError("No database connection");
  };

  const updateOneData = async (
    collection: string,
    filter: Filter<Bson.Document>,
    update: UpdateFilter<Bson.Document>,
    options?: UpdateOptions
  ) => {
    const db = getDbClinet();
    return db
      ? await db.collection(collection).updateOne(filter, update, options)
      : throwError("No database connection");
  };

  const removeData = async (collection: string, query: Bson.Document) => {
    const db = getDbClinet();
    return db
      ? await db.collection(collection).find(query).toArray()
      : throwError("No database connection");
  };

  // TODO : must be check if the inrelation and outrelation pure model is exist
  const setModel = (
    name: string,
    pureModel: PureModel,
    inrelation: Record<string, InRelation>,
    outrelation: Record<string, OutRelation>
  ) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    schemas[name] = {
      pure: pureModel,
      inrelation: inrelation,
      outrelation: outrelation,
    };

    return {
      find: (query: Bson.Document) => findData(name, query),
      findOne: (query: Bson.Document) => findOneData(name, query),
      insertOne: (query: Bson.Document) => insertOneData(name, query),
      updateOne: (
        filter: Filter<Bson.Document>,
        update: UpdateFilter<Bson.Document>,
        options?: UpdateOptions
      ) => updateOneData(name, filter, update, options),
      remove: (query: Bson.Document) => removeData(name, query),
    };
  };

  return {
    setDb,
    getCollection,
    findData,
    insertOneData,
    updateOneData,
    removeData,
    setModel,
  };
};
