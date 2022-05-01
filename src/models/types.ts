import { Struct } from "../deps.ts";
/**
 * PureModel is interface of pure feature,
 * pure feature is an intrinsic feature of an schema. Which are embedded in other schemas
 * @public
 */
export interface PureModel {
  [key: string]: Struct<any>;
}
/**
 * if schema has relation with other schema and in SQL that we keep foreign key.
 * store in InRelation feature
 * @public
 */
export interface InRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * type of relation if equal to one: this schema record one object from other schema else
   * this schema record array of object from other schema
   */
  type: "one" | "many";

  optional: boolean;
}
/**
 * if schema has relation with other schema and in SQL that we dont keep foriegn key.
 * store in OutRelation feature
 *  and usually the number of it greater thant of 50
 * @public
 */
export interface OutRelation {
  /**
   * name of schema that this schema has relation with
   */
  schemaName: string;
  /**
   * number of value that we want to keep
   */
  number: number;
  /**
   * sort : {field , order} - field of sort , and order of sort
   */
  sort: {
    field: string;
    order: "asc" | "desc";
    type: "number" | "date" | "objectId";
  };
}

/**
 * this model includes :pure feature , inrelation feature and outrelation feacture
 * @public
 */
export interface Model {
  pure: PureModel;
  inrelation: Record<string, InRelation>;
  outrelation: Record<string, OutRelation>;
}
