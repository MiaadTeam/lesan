import { Bson, Database } from "../deps.ts";

export const odm = () => {
  let mongoDb: Database;
  const setDb = (db: Database) => mongoDb = db;

  const getDbClinet = () => mongoDb;

  const findData = async (
    collection: string,
    query: Bson.Document,
  ) => {
    const db = getDbClinet();
    const result = await db.collection(collection).find(query).toArray();
    return result;
  };

  const createData = async (
    collection: string,
    query: Bson.Document,
  ) => {
    const db = getDbClinet();
    const result = await db.collection(collection).find(query).toArray();
    return result;
  };

  const updateData = async (
    collection: string,
    query: Bson.Document,
  ) => {
    const db = getDbClinet();
    const result = await db.collection(collection).find(query).toArray();
    return result;
  };

  const deleteData = async (
    collection: string,
    query: Bson.Document,
  ) => {
    const db = getDbClinet();
    const result = await db.collection(collection).find(query).toArray();
    return result;
  };

  return {
    setDb,
    findData,
    createData,
    updateData,
    deleteData,
  };
};
