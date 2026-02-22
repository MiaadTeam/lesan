import { schemaFns, TSchemas } from "../mod.ts";

/**
 * getOutRelations of one schema
 * @param schemaName - name of schema that we want outerRelations
 */
export const getRelatedRelations = (
  schemasObj: TSchemas,
  schemaName: string,
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[schemaName].relatedRelations;
};
