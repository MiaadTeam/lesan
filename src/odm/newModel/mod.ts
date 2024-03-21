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
import { IPureFields, schemaFns, TSchemas } from "../../models/mod.ts";
import {
  BulkWriteOptions,
  CountDocumentsOptions,
  Db,
  DeleteOptions,
  Document,
  FindOneAndUpdateOptions,
  Infer,
  InsertOneOptions,
  OptionalUnlessRequiredId,
} from "../../npmDeps.ts";
import { Projection } from "../aggregation/type.ts";
import { deleteOne } from "../delete/deleteOne.ts";
import { aggregation } from "../find/aggregation.ts";
import { find } from "../find/find.ts";
import { findOne } from "../find/findOne.ts";
import { insertOne, TInsertRelations } from "../insert/insertOne.ts";
import { addRelation } from "../relation/addRelation.ts";
import { insertMany } from "../insert/insertMany.ts";
import { removeRelation } from "../relation/removeRelation.ts";
import { findOneAndUpdate } from "../update/findOneAndUpdate.ts";

export const newModel = <
  PF extends IPureFields,
  TR extends IRelationsFileds,
>(
  db: Db,
  schemasObj: TSchemas,
  name: string,
  pureFields: PF,
  relations: TR,
) => {
  type InferPureFieldsType = {
    [key in keyof PF]?: Infer<PF[key]>;
  };

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
          mainRelationType: relations[relation].type,
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
