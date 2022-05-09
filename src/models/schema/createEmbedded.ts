import { getPureFromInRel } from "./getPureFromInRel.ts";
import { getPureFromOutRel } from "./getPureFromOutRel.ts";
import { Schemas } from "./mod.ts";

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
export const createEmbedded = (schemas: Schemas, schemaName: string) => {
  return {
    ...getPureFromInRel(schemas, schemaName),
    ...getPureFromOutRel(schemas, schemaName),
  };
};
