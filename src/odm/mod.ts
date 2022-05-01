import {
    assert,
    Bson,
    Database,
    enums,
    Filter,
    FindOptions,
    InsertDocument,
    InsertOptions,
    object,
    ObjectId,
    UpdateFilter,
    UpdateOptions,
} from "../deps.ts";
import { InRelation, ISchema, OutRelation, PureModel } from "../models/mod.ts";
import { schemaFns } from "../models/schema.ts";
import { throwError } from "../utils/throwError.ts";
import { addOutrelation, checkRelation, collectData, getPureFromDoc, makeProjection } from "./utils/mod.ts";

export const odm = (schemasObj: ISchema) => {
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

    const findData = async (collection: string, query: Bson.Document) => {
        const db = getDbClient();
        const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
        assert(collection, getSchemas);
        return db
            ? await db.collection(collection).find(query).toArray()
            : throwError("No database connection");
    };

    const findOneData = async (
        collection: string,
        filter: Filter<Bson.Document>,
        get: Record<string, any>,
        options?: FindOptions,
    ) => {
        const db = getDbClient();
        const getSchemas = enums(schemaFns(schemasObj).getSchemasKeys());
        const schemas = schemaFns(schemasObj).getSchemas();
        assert(collection, getSchemas);

        const projection = makeProjection(collection, {}, get, schemas);

        const result = await collectData(
            schemas,
            filter,
            db,
            projection,
            collection,
            {},
            "one",
            options,
        );
        return result;
    };

    const findOnePureData = async (
        collection: string,
        filter: Filter<Bson.Document>,
        options?: FindOptions,
    ) => {
        const getPureSchema = schemaFns(schemasObj);
        const result = "";

        return result;
    };

    const insertOneData = async (
        collection: string,
        doc: InsertDocument<Bson.Document>,
        relation: Record<string, ObjectId | ObjectId[]>,
        options?: InsertOptions,
    ) => {
        const db = getDbClient();
        const pureInrelSchema = schemaFns(schemasObj).getPureInRel(collection);
        const foundedSchema = schemaFns(schemasObj).getSchema(collection);
        const inrelationObj = schemaFns(schemasObj).getSchema(collection).inrelation;

        // console.log("doc================>", doc);
        for (const key in inrelationObj) {
            if (inrelationObj[key].optional === false) {
                if (!Array.isArray(relation[inrelationObj[key].schemaName])) {
                    const res = await findOneData(inrelationObj[key].schemaName, {
                        _id: relation[inrelationObj[key].schemaName],
                    }, {});
                    doc[key] = res;
                    // doc = Object.assign(res, doc);
                } else {
                    const res = await findData(inrelationObj[key].schemaName, {
                        _id: { $in: relation[inrelationObj[key].schemaName] },
                    });
                    doc[key] = res;
                }
            }
        }
        assert(doc, object(pureInrelSchema));

        doc = addOutrelation(collection, doc, foundedSchema);

        doc._id = db
            ? await db.collection(collection).insertOne(doc, options)
            : throwError("No database connection");

        // console.log(result);

        checkRelation(collection, inrelationObj, schemasObj, doc, db);

        return doc._id;
    };

    const updateOneData = async (
        collection: string,
        filter: Filter<Bson.Document>,
        update: UpdateFilter<Bson.Document>,
        options?: UpdateOptions,
    ) => {
        const db = getDbClient();
        return db
            ? await db.collection(collection).updateOne(filter, update, options)
            : throwError("No database connection");
    };

    const removeData = async (collection: string, query: Bson.Document) => {
        const db = getDbClient();
        return db
            ? await db.collection(collection).find(query).toArray()
            : throwError("No database connection");
    };

    // TODO : must be check if the inrelation and outrelation pure model is exist
    const setModel = (
        name: string,
        pureModel: PureModel,
        inrelation: Record<string, InRelation>,
        outrelation: Record<string, OutRelation>,
    ) => {
        const schemas = schemaFns(schemasObj).getSchemas();

        schemas[name] = {
            pure: pureModel,
            inrelation: inrelation,
            outrelation: outrelation,
        };

        return {
            find: (query: Bson.Document) => findData(name, query),
            findOne: (
                filter: Filter<Bson.Document>,
                get: Record<string, any>,
                options?: FindOptions,
            ) => findOneData(name, filter, get, options),

            insertOne: (query: Bson.Document, relation: Record<string, ObjectId | ObjectId[]>) =>
                insertOneData(name, query, relation),
            updateOne: (
                filter: Filter<Bson.Document>,
                update: UpdateFilter<Bson.Document>,
                options?: UpdateOptions,
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
