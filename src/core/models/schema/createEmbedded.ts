import { getPureFromMainRelations } from "./getPureFromMainRelations.ts";
import { getPureFromRelatedRelations } from "./getPureFromRelatedRelations.ts";
import { TSchemas } from "./mod.ts";

/**
 * create embed features, embed feature is equal to all of pure features of inerRelations and outerRelations
 * @param schemaName - name of schema
 * @returns return embedd feature of schema
 * for example
 * {
 *       "posts": array({
 *         "id": string(),
 *         "title": string(),
 *         "content": string(),
 *       }),
 *       "comments": array({
 *         "id": string(),
 *         "content": string(),
 *       }),
 * }
 */
export const createEmbedded = (schemas: TSchemas, schemaName: string) => {
  return {
    ...getPureFromMainRelations(schemas, schemaName),
    ...getPureFromRelatedRelations(schemas, schemaName),
  };
};
