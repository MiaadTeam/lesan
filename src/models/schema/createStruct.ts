import { assign, object } from "../../npmDeps.ts";
import { createEmbedded } from "./createEmbedded.ts";
import { getSchema } from "./getSchema.ts";
import { Schemas } from "./mod.ts";

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
export const createStruct = (schemas: Schemas, schemaName: string) => {
  const schema = getSchema(schemas, schemaName);
  return assign(
    object(schema.pure),
    object(createEmbedded(schemas, schemaName)),
  );
};
