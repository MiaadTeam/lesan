import { Bson, Database } from "../deps.ts";
import { SchemasKey } from "../mod.ts";

let mongoDb: Database;

export const setDb = (db: Database) => mongoDb = db;

export const getDbClinet = () => mongoDb;

export const findData = async (
  collection: SchemasKey,
  query: Bson.Document,
) => {
  const db = getDbClinet();
  const result = await db.collection(collection).find(query).toArray();
  return result;
};

export const createData = async (
  collection: SchemasKey,
  query: Bson.Document,
) => {
  const db = getDbClinet();
  const result = await db.collection(collection).find(query).toArray();
  return result;
};

export const updateData = async (
  collection: SchemasKey,
  query: Bson.Document,
) => {
  const db = getDbClinet();
  const result = await db.collection(collection).find(query).toArray();
  return result;
};

export const deleteData = async (
  collection: SchemasKey,
  query: Bson.Document,
) => {
  const db = getDbClinet();
  const result = await db.collection(collection).find(query).toArray();
  return result;
};
