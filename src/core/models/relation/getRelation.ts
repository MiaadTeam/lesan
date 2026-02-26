import { schemaFns, TSchemas } from "../mod.ts";
import { RelationType } from "../types.ts";

/**
 * get inerRelatrion or outerRealtion of one schema
 * @param name - name of schema
 * @param relationType - type of relation that we want (inerRelatrion or outrelation)
 */
export const getRelation = (
  schemasObjs: TSchemas,
  name: string,
  relationType: RelationType,
) => {
  const schemas = schemaFns(schemasObjs).getSchemas();
  return schemas[name][relationType];
};
