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
export const getPureSchema = (
  schemas: TSchemas,
  schemaName: string,
  excludes?: string[],
) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema ${schemaName} not found`);
  }

  // Create a deep copy of the pure object to avoid mutations
  const pure = { ...schema.pure };

  // Collect all fields to exclude
  const fieldsToExclude = [
    ...(schema.options?.excludes || []),
    ...(excludes || []),
  ];

  // Remove excluded fields from the copied object
  fieldsToExclude.forEach((field) => {
    if (pure[field]) delete pure[field];
  });

  return pure;
};
