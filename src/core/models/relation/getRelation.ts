import { schemaFns, TSchemas } from "../mod.ts";
import {
  IMainRelation,
  IRelatedRelation,
  RelationType,
  TRelation,
} from "../types.ts";

/**
 * get inerRelatrion or outerRealtion of one schema
 * @param name - name of schema
 * @param relationType - type of relation that we want (inerRelatrion or outrelation)
 */
export const getRelation = (
  schemasObjs: TSchemas,
  name: string,
  relationType: RelationType,
):
  | Record<string, TRelation>
  | Record<string, IMainRelation>
  | Record<string, IRelatedRelation> => {
  const schemas = schemaFns(schemasObjs).getSchemas();
  return schemas[name][relationType];
};
