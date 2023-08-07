import { schemaFns, TSchemas } from "../mod.ts";

/**
 * get all of inerRealation of one schema
 * @param schemaName - name of schema that we want inerRealation of it
 */
export const getMainRelations = (schemasObj: TSchemas, schemaName: string) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  schemas[schemaName].mainRelations;
};
