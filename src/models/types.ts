import { Struct } from "../deps.ts";

export interface PureModel {
  [key: string]: Struct<any>;
}

export interface InRelation {
  schemaName: string;
  type: "one" | "many";
}

export interface OutRelation {
  schemaName: string;
  number: number;
  sort: { field: string; order: "asc" | "desc" };
}

export interface Model {
  pure: PureModel;
  inrelation: Record<string, InRelation>;
  outrelation: Record<string, OutRelation>;
}
