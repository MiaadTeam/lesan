import { Database, DeleteOptions } from "../../deps.ts";
import {
  AggregateOptions,
  AggregatePipeline,
  Bson,
  Filter,
  FindOptions,
  IMainRelation,
  InsertDocument,
  InsertOptions,
  ObjectId,
  objectIdValidation,
  optional,
  TRelation,
  UpdateFilter,
  UpdateOptions,
} from "../../mod.ts";
import { PureFields, schemaFns, TSchemas } from "../../models/mod.ts";
import { Projection } from "../aggregation/type.ts";
import { deleteMethod } from "../delete/delete.ts";
import { deleteById } from "../delete/deleteById.ts";
import { aggregation } from "../find/aggregation.ts";
import { find } from "../find/find.ts";
import { findOne } from "../find/findOne.ts";
import { insertOne } from "../insert/insertOne.ts";
import { updateById } from "../update/updateById.ts";
import { updateOne } from "../update/updateOne.ts";

export const newModel = (
  db: Database,
  schemasObj: TSchemas,
  name: string,
  pureFields: PureFields,
  relations: Record<string, TRelation>,
) => {
  const schemas = schemaFns(schemasObj).getSchemas();

  pureFields = pureFields._id ? pureFields : {
    _id: optional(objectIdValidation),
    ...pureFields,
  };

  const mainRelations: Record<string, IMainRelation> = {};
  for (const relation in relations) {
    mainRelations[relation] = {
      schemaName: relations[relation].schemaName,
      type: relations[relation].type,
      optional: relations[relation].optional,
    };

    relations[relation].relatedRelations.forEach((relatedRelation) => {
      schemas[relations[relation].schemaName]
        .relatedRelations[relatedRelation.name] = {
          mainRelationName: relation,
          schemaName: relations[relation].schemaName,
          limit: relatedRelation.limit,
          sort: relatedRelation.sort,
        };
    });
  }

  schemas[name] = {
    pure: pureFields,
    relations,
    mainRelations,
    relatedRelations: {},
  };

  return {
    find: (query: Bson.Document, projection: Projection) =>
      find(schemasObj, db, name, query, projection),

    findOne: (
      filter: Filter<Bson.Document>,
      get: Projection,
      options?: FindOptions,
    ) => findOne(db, schemasObj, name, filter, get, options),

    insertOne: (
      { doc, relation, options, get }: {
        doc: InsertDocument<Bson.Document>;
        relation?: Record<string, ObjectId | ObjectId[]>;
        options?: InsertOptions;
        get: Projection;
      },
    ) =>
      insertOne({
        db,
        schemasObj,
        collection: name,
        doc,
        relation,
        options,
        get,
      }),

    updateOne: (
      filter: Filter<Bson.Document>,
      update: UpdateFilter<Bson.Document>,
      options?: UpdateOptions,
    ) => updateOne(db, name, filter, update, options),

    updateById: (
      {
        _id,
        update,
        options,
        get,
      }: {
        _id: string | ObjectId;
        update: UpdateFilter<Bson.Document>;
        options?: UpdateOptions;
        get?: Projection;
      },
    ) =>
      updateById({
        db,
        schemasObj,
        collection: name,
        _id,
        update,
        options,
        get,
      }),

    delete: (query: Bson.Document, options?: DeleteOptions) =>
      deleteMethod(db, name, query, options),

    deleteById: ({
      _id,
      options,
      get,
    }: {
      _id: ObjectId | string;
      options?: DeleteOptions;
      get?: Projection;
    }) =>
      deleteById({
        db,
        schemasObj,
        collection: name,
        _id,
        options,
        get,
      }),

    aggregation: (
      {
        pipline,
        options,
        get,
      }: {
        pipline: AggregatePipeline<Bson.Document>[];
        options?: AggregateOptions | undefined;
        get?: Projection;
      },
    ) =>
      aggregation({ db, schemasObj, collection: name, pipline, options, get }),
  };
};
