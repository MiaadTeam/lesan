import { assign, object } from "../../npmDeps.ts";
import { createEmbedded } from "./createEmbedded.ts";
import { getSchema } from "./getSchema.ts";
import { getPureSchema, TSchemas } from "./mod.ts";

/**
 * create struct features, struct feature is used for create client of db.
 * struct feature is include pure feature and embed features
 * @param schemaName - name of schema that we want struct feature
 * @returns return struct feature
 * for example :
 * assign(
 *       object({
 *         "id": string(),
 *         "content": string(),
 *       }),
 *       object({
 *         "user": object({
 *           "id": string(),
 *           "name": string(),
 *           "age": number(),
 *         }),
 *         "post": object({
 *           "id": string(),
 *           "title": string(),
 *           "content": string(),
 *         }),
 *       }),
 *    ),
 */
export const createStruct = (schemas: TSchemas, schemaName: string) => {
  return assign(
    object(getPureSchema(schemas, schemaName)),
    object(createEmbedded(schemas, schemaName)),
  );
};
