import { Db } from "../../npmDeps.ts";
import { IPureFields, IRelationsFileds, TSchemas } from "../models/mod.ts";
import { schemaFns } from "../models/mod.ts";
import { assert, enums } from "../../npmDeps.ts";
import { throwError } from "../utils/throwError.ts";
import { newModel, OptionType } from "./newModel/mod.ts";

export const odm = (schemasObj: TSchemas): {
  setDb: (db: Db) => Db;
  getCollection: (
    collection: string,
  ) => import("../../npmDeps.ts").Collection<
    import("../../npmDeps.ts").Document
  >;
  newModel: <PF extends IPureFields, TR extends IRelationsFileds>(
    name: string,
    pureFields: PF,
    relations: TR,
    options?: OptionType<PF>,
  ) => ReturnType<typeof newModel<PF, TR>>;
} => {
  let mongoDb: Db;

  const setDb = (db: Db) => (mongoDb = db);

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
    newModel: <PF extends IPureFields, TR extends IRelationsFileds>(
      name: string,
      pureFields: PF,
      relations: TR,
      options?: OptionType<PF>,
    ) =>
      newModel<PF, TR>(
        mongoDb,
        schemasObj,
        name,
        pureFields,
        relations,
        options,
      ),
  };
};

export * from "./utils/mod.ts";
