import { Database } from "../deps.ts";
import {
	IPureFields,
	IRelationsFileds,
	TRelation,
	TSchemas,
} from "../models/mod.ts";
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
		newModel: <PF extends IPureFields, TR extends IRelationsFileds>(
			name: string,
			pureFields: PF,
			relations: TR,
			options?: { excludes?: Partial<(keyof PF)>[] },
		) => newModel<PF, TR>(
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
