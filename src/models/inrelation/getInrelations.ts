import { ISchema, schemaFns } from "../mod.ts";

/**
 * get all of inerRealation of one schema
 * @param schemaName - name of schema that we want inerRealation of it
 */
export const getInrelations = (schemasObj: ISchema, schemaName: string) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  schemas[schemaName].inrelation;
};
