import { Struct } from "../npmDeps.ts";

/**
 * PureModel is interface of pure feature,
 * pure feature is an intrinsic feature of an schema. Which are embedded in other schemas
 * @public
 */
export interface PureFields {
  [key: string]: Struct<any>;
}

export type TRelation = {
  schemaName: string;
  type: "single" | "multiple";
  optional: boolean;
  relatedRelations: {
    name: string;
    limit: null | number;
    sort: {
      field: string;
      order: "asc" | "desc";
      type: "number" | "date" | "objectId";
    };
  }[];
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
  type: "single" | "multiple";

  optional: boolean;
}

/**
 * if schema has relation with other schema and in SQL that we dont keep foriegn key.
 * store in OutRelation feature
 *  and usually the number of it greater thant of 50
 * @public
 */
export interface IRelatedRelatin {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * name of the main relation related to this relation
   */
  mainRelationName: string;
  /**
   * number of value that we want to keep
   */
  limit: null | number;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort: {
    field: string;
    order: "asc" | "desc";
    type: "number" | "date" | "objectId";
  };
}

export type RelationType = "mainRelations" | "relatedRelations" | "relations";

/**
 * this model includes :pure feature , inrelation feature and outrelation feacture
 * @public
 */
export interface IModel {
  pure: PureFields;
  relations: Record<string, TRelation>;
  mainRelations: Record<string, IMainRelation>;
  relatedRelations: Record<string, IRelatedRelatin>;
}
