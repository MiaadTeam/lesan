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
import { insertOne, TInsertRelations } from "../insert/insertOne.ts";
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
    relations[relation].sort &&
      (mainRelations[relation].sort = relations[relation].sort);

    for (const relatedRelation in relations[relation].relatedRelations) {
      const iteratedRelatedRelation =
        relations[relation].relatedRelations[relatedRelation];
      schemas[relations[relation].schemaName]
        .relatedRelations[relatedRelation] = {
          mainRelationName: relation,
          schemaName: name,
          type: iteratedRelatedRelation.type,
        };
      iteratedRelatedRelation.limit && (schemas[relations[relation].schemaName]
        .relatedRelations[relatedRelation].limit =
          iteratedRelatedRelation.limit);
      iteratedRelatedRelation.sort && (schemas[relations[relation].schemaName]
        .relatedRelations[relatedRelation].sort = iteratedRelatedRelation.sort);
    }
  }

  schemas[name] = {
    pure: pureFields,
    relations,
    mainRelations,
    relatedRelations: {},
  };

  interface IFindModelInputs {
    filters?: Filter<Bson.Document>;
    projection?: Projection;
    options?: FindOptions;
  }

  return {
    find: (
      { filters, projection, options }: IFindModelInputs,
    ) => find({ db, collection: name, filters, projection, options }),

    findOne: (
      { filters, projection, options }: IFindModelInputs,
    ) => findOne({ db, collection: name, filters, projection, options }),

    insertOne: (
      { doc, relations, options, projection }: {
        doc: InsertDocument<Bson.Document>;
        relations?: TInsertRelations;
        options?: InsertOptions;
        projection?: Projection;
      },
    ) =>
      insertOne({
        db,
        schemasObj,
        collection: name,
        doc,
        relations,
        options,
        projection,
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
        pipeline,
        options,
        projection,
      }: {
        pipeline: AggregatePipeline<Bson.Document>[];
        options?: AggregateOptions | undefined;
        projection?: Projection;
      },
    ) =>
      aggregation({
        db,
        schemasObj,
        collection: name,
        pipeline,
        options,
        projection,
      }),
  };
};
