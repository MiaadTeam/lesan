import { Struct } from "https://deno.land/x/lestruct/mod.ts";
import { SchemasKey } from "./mod.ts";

export interface PureModel {
  [key: string]: Struct<any>;
}

export interface InRelation {
  schemaName: SchemasKey;
  type: "one" | "many";
}

export interface OutRelation {
  schemaName: SchemasKey;
  number: number;
  sort: { field: string; order: "asc" | "desc" };
}

export interface Model {
  pure: PureModel;
  inrelation: Record<string, InRelation>;
  outrelation: Record<string, OutRelation>;
}
