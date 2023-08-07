import { TSchemas } from "./mod.ts";

/**
 * get pure feature of one schema
 * @param schemaName - name of schema that we want pure feature
 * @returns return pure feature of schema for example:
 * {
 *       "id": string(),
 *       "name": string(),
 *       "age": number(),
 *     },
 */
export const getPureSchema = (schemas: TSchemas, schemaName: string) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema ${schemaName} not found`);
  }

  return schema.pure;
};
