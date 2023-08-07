import { getPureFromMainRelations } from "./getPureFromMainRelations.ts";
import { getPureSchema } from "./getPureSchema.ts";
import { TSchemas } from "./mod.ts";

/**
 * extract pure feature of inrelations schema
 * @param schemaName - name of schema
 * @returns return pure fetaures of schema that we have inrelation with it
 *  for example if: inerRelation of schema is equal to '{
 *
 *       "posts": { schemaName: "post", type: "many" },
 *  }'
 *  output of this function is equal to :{
 *         "posts": array({
 *        "id": string(),
 *         "title": string(),
 *         "content": string(),
 *       }),}
 */
export const getPureOfMainRelations = (
  schemas: TSchemas,
  schemaName: string,
) => {
  const pureSchema = getPureSchema(schemas, schemaName);
  const pureInrel = getPureFromMainRelations(schemas, schemaName);

  return {
    ...pureSchema,
    ...pureInrel,
  };
};
