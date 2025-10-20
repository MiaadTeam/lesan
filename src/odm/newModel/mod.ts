import {
  AggregateOptions,
  Filter,
  FindOptions,
  IMainRelation,
  IRelationsFileds,
  objectIdValidation,
  optional,
  UpdateFilter,
} from "../../mod.ts";
import {
  IPureFields,
  schemaFns,
  TInsertRelations,
  TSchemas,
} from "../../models/mod.ts";
import {
  BulkWriteOptions,
  CountDocumentsOptions,
  CreateIndexesOptions,
  Db,
  DeleteOptions,
  Document,
  FindOneAndUpdateOptions,
  IndexSpecification,
  Infer,
  InsertOneOptions,
  OptionalUnlessRequiredId,
} from "../../npmDeps.ts";
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
) => {
  type InferPureFieldsType = {
    [key in keyof PF]?: Infer<PF[key]>;
  };

  const schemas = schemaFns(schemasObj).getSchemas();

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

    for (const relatedRelation in relations[relation].relatedRelations) {
      const iteratedRelatedRelation =
        relations[relation].relatedRelations[relatedRelation];

      if (!schemas[relations[relation].schemaName]) {
        schemas[relations[relation].schemaName] = {
          pure: {},
          relations: {},
          mainRelations: {},
          relatedRelations: {},
          options: {},
        };
      }

      const schema = schemas[relations[relation].schemaName];

      schema.relatedRelations[relatedRelation] = {
        mainRelationName: relation,
        mainRelationType: relations[relation].type,
        schemaName: name,
        type: iteratedRelatedRelation.type,
      };

      if (iteratedRelatedRelation.limit) {
        schema.relatedRelations[relatedRelation].limit =
          iteratedRelatedRelation.limit;
      }
      if (iteratedRelatedRelation.sort) {
        schema.relatedRelations[relatedRelation].sort =
          iteratedRelatedRelation.sort;
      }
      if (iteratedRelatedRelation.excludes) {
        schema.relatedRelations[relatedRelation].excludes =
          iteratedRelatedRelation.excludes;
      }
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
    options: (options as { excludes?: (string | number)[] }),
  };

  if (options && options.createIndex) {
    db.collection(name).createIndex(
      options.createIndex.indexSpec,
      options.createIndex.options,
    );
  }

  interface IFindModelInputs {
    filters: Filter<Document>;
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
