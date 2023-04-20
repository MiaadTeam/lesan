import { ISchema, schemaFns } from "../mod.ts";

/**
 * getOutRelations of one schema
 * @param schemaName - name of schema that we want outerRelations
 */
export const getOutRelations = (schemasObj: ISchema, schemaName: string) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[schemaName].outrelation;
};
