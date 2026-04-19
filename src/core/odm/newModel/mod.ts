import {
  IMainRelation,
  IRelationsFileds,
  objectIdValidation,
} from "../../../mod.ts";
import {
  IPureFields,
  schemaFns,
  TInsertRelations,
  TSchemas,
} from "../../models/mod.ts";
import {
  AggregateOptions,
  BulkWriteOptions,
  CountDocumentsOptions,
  CreateIndexesOptions,
  Db,
  DeleteOptions,
  Document,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  IndexSpecification,
  Infer,
  InsertOneOptions,
  optional,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from "../../../npmDeps.ts";
import { Projection } from "../aggregation/type.ts";
import { deleteOne } from "../delete/deleteOne.ts";
import { aggregation } from "../find/aggregation.ts";
import { find } from "../find/find.ts";
import { findOne } from "../find/findOne.ts";
import { insertOne } from "../insert/insertOne.ts";
import { addRelation } from "../relation/addRelation.ts";
import { insertMany } from "../insert/insertMany.ts";
import { removeRelation } from "../relation/removeRelation.ts";
import { findOneAndUpdate } from "../update/findOneAndUpdate.ts";

export type OptionType<PF extends IPureFields> = {
  createIndex?: {
    indexSpec: IndexSpecification;
    options?: CreateIndexesOptions;
  };
  excludes?: Partial<(keyof PF)>[];
};

export interface IFindModelInputs {
  filters: Filter<Document>;
  projection?: Projection;
  options?: FindOptions;
}

export const newModel = <
  PF extends IPureFields,
  TR extends IRelationsFileds,
>(
  db: Db,
  schemasObj: TSchemas,
  name: string,
  pureFields: PF,
  relations: TR,
  options?: OptionType<PF>,
): {
  find: (args: IFindModelInputs) => ReturnType<typeof find>;
  findOne: (args: IFindModelInputs) => ReturnType<typeof findOne>;
  insertOne: (args: {
    doc: OptionalUnlessRequiredId<{ [key in keyof PF]?: Infer<PF[key]> }>;
    relations?: TInsertRelations<TR>;
    options?: InsertOneOptions;
    projection?: Projection;
  }) => ReturnType<typeof insertOne>;
  insertMany: (args: {
    docs: OptionalUnlessRequiredId<{ [key in keyof PF]?: Infer<PF[key]> }>[];
    relations?: TInsertRelations<TR>;
    options?: BulkWriteOptions;
    projection?: Projection;
  }) => ReturnType<typeof insertMany>;
  addRelation: (args: {
    relations: TInsertRelations<TR>;
    projection?: Projection;
    filters: Filter<Document>;
    replace?: boolean;
  }) => ReturnType<typeof addRelation>;
  removeRelation: (args: {
    relations: TInsertRelations<TR>;
    projection?: Projection;
    filters: Filter<Document>;
  }) => ReturnType<typeof removeRelation>;
  findOneAndUpdate: (args: {
    filter: Filter<{ [key in keyof PF]?: Infer<PF[key]> }>;
    update: UpdateFilter<{ [key in keyof PF]?: Infer<PF[key]> }>;
    options?: FindOneAndUpdateOptions & {
      includeResultMetadata: true;
    };
    projection: Document;
  }) => ReturnType<typeof findOneAndUpdate>;
  deleteOne: (args: {
    filter: Filter<{ [key in keyof PF]?: Infer<PF[key]> }>;
    options?: DeleteOptions;
    hardCascade?: boolean;
  }) => ReturnType<typeof deleteOne>;
  aggregation: (args: {
    pipeline: Document[];
    options?: AggregateOptions | undefined;
    projection?: Projection;
  }) => ReturnType<typeof aggregation>;
  countDocument: (args: {
    filter?: Document | undefined;
    options?: CountDocumentsOptions | undefined;
  }) => Promise<number>;
} => {
  type InferPureFieldsType = {
    [key in keyof PF]?: Infer<PF[key]>;
  };

  const schemas = schemaFns(schemasObj).getSchemas();

  const rebuildAllRelatedRelations = () => {
    for (const schemaName in schemas) {
      if (!schemas[schemaName]) continue;
      schemas[schemaName].relatedRelations = {};
    }

    for (const sourceSchemaName in schemas) {
      const sourceSchema = schemas[sourceSchemaName];
      if (!sourceSchema || !sourceSchema.relations) continue;

      for (const mainRelationName in sourceSchema.relations) {
        const mainRelation = sourceSchema.relations[mainRelationName];
        if (!mainRelation) continue;

        const targetSchemaName = mainRelation.schemaName;

        if (!schemas[targetSchemaName]) {
          schemas[targetSchemaName] = {
            pure: {},
            relations: {},
            mainRelations: {},
            relatedRelations: {},
            options: {},
          };
        }

        for (const relatedRelationName in mainRelation.relatedRelations) {
          const iteratedRelatedRelation =
            mainRelation.relatedRelations[relatedRelationName];

          schemas[targetSchemaName].relatedRelations[relatedRelationName] = {
            mainRelationName,
            mainRelationType: mainRelation.type,
            schemaName: sourceSchemaName,
            type: iteratedRelatedRelation.type,
          };

          if (iteratedRelatedRelation.limit) {
            schemas[targetSchemaName].relatedRelations[relatedRelationName]
              .limit = iteratedRelatedRelation.limit;
          }

          if (iteratedRelatedRelation.sort) {
            schemas[targetSchemaName].relatedRelations[relatedRelationName]
              .sort = iteratedRelatedRelation.sort;
          }

          if (iteratedRelatedRelation.excludes) {
            schemas[targetSchemaName].relatedRelations[relatedRelationName]
              .excludes = iteratedRelatedRelation.excludes;
          }
        }
      }
    }
  };

  const mainRelations = Object.keys(relations).reduce((acc, relation) => {
    const mainRelation: IMainRelation = {
      schemaName: relations[relation].schemaName,
      type: relations[relation].type,
      optional: relations[relation].optional,
    };

    if (relations[relation].sort) {
      mainRelation.sort = relations[relation].sort;
    }

    if (relations[relation].excludes) {
      mainRelation.excludes = relations[relation].excludes;
    }

    if (relations[relation].limit) {
      mainRelation.limit = relations[relation].limit;
    }

    const targetSchemaName = relations[relation].schemaName;

    if (!schemas[targetSchemaName]) {
      schemas[targetSchemaName] = {
        pure: {},
        relations: {},
        mainRelations: {},
        relatedRelations: {},
        options: {},
      };
    }

    acc[relation] = mainRelation;
    return acc;
  }, {} as Record<string, IMainRelation>);

  schemas[name] = {
    pure: {
      _id: optional(objectIdValidation),
      ...pureFields,
    },
    relations,
    mainRelations,
    relatedRelations: {},
    options: options as { excludes?: (string | number)[] },
  };

  rebuildAllRelatedRelations();

  if (options && options.createIndex) {
    db.collection(name).createIndex(
      options.createIndex.indexSpec,
      options.createIndex.options,
    );
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
        doc: OptionalUnlessRequiredId<InferPureFieldsType>;
        relations?: TInsertRelations<TR>;
        options?: InsertOneOptions;
        projection?: Projection;
      },
    ) =>
      insertOne<TR, InferPureFieldsType>({
        db,
        schemasObj,
        collection: name,
        doc,
        relations,
        options,
        projection,
      }),

    insertMany: (
      { docs, relations, options, projection }: {
        docs: OptionalUnlessRequiredId<InferPureFieldsType>[];
        relations?: TInsertRelations<TR>;
        options?: BulkWriteOptions;
        projection?: Projection;
      },
    ) =>
      insertMany<TR, InferPureFieldsType>({
        db,
        schemasObj,
        collection: name,
        docs,
        relations,
        options,
        projection,
      }),

    addRelation: ({ filters, relations, projection, replace }: {
      relations: TInsertRelations<TR>;
      projection?: Projection;
      filters: Filter<Document>;
      replace?: boolean;
    }) =>
      addRelation<TR>({
        db,
        schemasObj,
        collection: name,
        filters,
        relations,
        projection,
        replace,
      }),

    removeRelation: ({ filters, relations, projection }: {
      relations: TInsertRelations<TR>;
      projection?: Projection;
      filters: Filter<Document>;
    }) =>
      removeRelation<TR>({
        db,
        schemasObj,
        collection: name,
        filters,
        relations,
        projection,
      }),

    findOneAndUpdate: ({
      filter,
      options,
      update,
      projection,
    }: {
      filter: Filter<InferPureFieldsType>;
      update: UpdateFilter<InferPureFieldsType>;
      options?: FindOneAndUpdateOptions & {
        includeResultMetadata: true;
      };
      projection: Document;
    }) =>
      findOneAndUpdate<InferPureFieldsType>({
        db,
        schemasObj,
        collection: name,
        filter,
        options,
        projection,
        update,
      }),

    // updateOne: (
    //   filter: Filter<Document>,
    //   update: UpdateFilter<Document>,
    //   options?: UpdateOptions,
    // ) => updateOne(db, name, filter, update, options),

    // updateById: (
    //   {
    //     _id,
    //     update,
    //     options,
    //     get,
    //   }: {
    //     _id: string | ObjectId;
    //     update: UpdateFilter<Document>;
    //     options?: UpdateOptions;
    //     get?: Projection;
    //   },
    // ) =>
    //   updateById({
    //     db,
    //     schemasObj,
    //     collection: name,
    //     _id,
    //     update,
    //     options,
    //     get,
    //   }),

    // delete: (query: Filter<PF>, options?: DeleteOptions) =>
    //   deleteMethod<PF>(db, name, query, options),

    deleteOne: ({
      filter,
      options,
      hardCascade,
    }: {
      filter: Filter<InferPureFieldsType>;
      options?: DeleteOptions;
      hardCascade?: boolean;
    }) =>
      deleteOne<InferPureFieldsType>({
        db,
        schemasObj,
        collection: name,
        filter,
        options,
        hardCascade,
      }),

    aggregation: (
      {
        pipeline,
        options,
        projection,
      }: {
        pipeline: Document[];
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

    countDocument: (
      {
        filter,
        options,
      }: {
        filter?: Document | undefined;
        options?: CountDocumentsOptions | undefined;
      },
    ) => db.collection(name).countDocuments(filter, options),
  };
};
