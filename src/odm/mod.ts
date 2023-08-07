import { Database } from "../deps.ts";
import { PureFields, TRelation, TSchemas } from "../models/mod.ts";
import { schemaFns } from "../models/mod.ts";
import { assert, enums } from "../npmDeps.ts";
import { throwError } from "../utils/throwError.ts";
import { newModel } from "./newModel/mod.ts";

export const odm = (schemasObj: TSchemas) => {
  let mongoDb: Database;

  const setDb = (db: Database) => (mongoDb = db);

  const getDbClient = () => mongoDb;

  const getCollection = (collection: string) => {
    const db = getDbClient();
    const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
    assert(collection, getSchemas);
    return db
      ? db.collection(collection)
      : throwError("No database connection");
  };

  return {
    setDb,
    getCollection,
    newModel: (
      name: string,
      pureFields: PureFields,
      relations: Record<string, TRelation>,
    ) =>
      newModel(
        mongoDb,
        schemasObj,
        name,
        pureFields,
        relations,
      ),
  };
};

export * from "./utils/mod.ts";
