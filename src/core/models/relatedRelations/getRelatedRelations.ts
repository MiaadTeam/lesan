import { IRelatedRelation } from "../types.ts";
import { schemaFns, TSchemas } from "../mod.ts";

/**
 * getOutRelations of one schema
 * @param schemaName - name of schema that we want outerRelations
 */
export const getRelatedRelations = (
  schemasObj: TSchemas,
  schemaName: string,
): Record<string, IRelatedRelation> => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[schemaName].relatedRelations;
};
