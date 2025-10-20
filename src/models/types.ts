import { ObjectId, Struct } from "../npmDeps.ts";

/**
 * PureModel is interface of pure feature,
 * pure feature is an intrinsic feature of an schema. Which are embedded in other schemas
 * @public
 */
export interface IPureFields {
  [key: string]: Struct<any>;
}

export type RelationDataType = "single" | "multiple";

export type RelationSortOrderType = "asc" | "desc";

export type TRelatedRelation = {
  type: RelationDataType;
  limit?: null | number;
  excludes?: string[];
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
};

export interface TRelation {
  schemaName: string;
  type: RelationDataType;
  optional: boolean;
  excludes?: string[];

  //WARN It's very dengrouse becuase in most cases we do not need to have two many-to-many limited relation one side of many-to-many should be unlimited always (becuase we do not have seperate table to keep all reffrence)
  limit?: null | number;
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
  relatedRelations: {
    [key: string]: TRelatedRelation;
  };
}

export interface IRelationsFileds {
  [key: string]: TRelation;
}

export type TInsertRelations<T extends IRelationsFileds> = {
  [mainKey in keyof T]?: {
    _ids: ObjectId | ObjectId[];
    relatedRelations?: {
      [key in keyof T[mainKey]["relatedRelations"]]: boolean;
    };
  };
};

/**
 * if schema has relation with other schema and in SQL that we keep foreign key.
 * store in InRelation feature
 * @public
 */
export interface IMainRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;

  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: RelationDataType;

  optional: boolean;

  /**
   * Fields we want to delete in this relation
   */
  excludes?: string[];

  //WARN It's very dengrouse becuase in most cases we do not need to have two many-to-many limited relation one side of many-to-many should be unlimited always (becuase we do not have seperate table to keep all reffrence)
  /**
   * number of value that we want to keep
   */
  limit?: null | number;

  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}

/**
 * if schema has relation with other schema and in SQL that we dont keep foriegn key.
 * store in OutRelation feature
 *  and usually the number of it greater thant of 50
 * @public
 */
export interface IRelatedRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;

  /**
   * name of the main relation related to this relation
   */
  mainRelationName: string;

  /**
   * type of the main relation related to this relation
   */
  mainRelationType: RelationDataType;

  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: RelationDataType;

  /**
   * number of value that we want to keep
   */
  limit?: null | number;

  /**
   * Fields we want to delete in this relation
   */
  excludes?: string[];

  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}

export type RelationType = "mainRelations" | "relatedRelations" | "relations";

/**
 * this model includes :pure feature , inrelation feature and outrelation feacture
 * @public
 */
export interface IModel {
  pure: IPureFields;
  relations: Record<string, TRelation>;
  mainRelations: Record<string, IMainRelation>;
  relatedRelations: Record<string, IRelatedRelation>;
  options?: { excludes?: (string | number)[] };
}
