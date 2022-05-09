import { array, object } from "../../deps.ts";
import { getSchema } from "./getSchema.ts";
import { Schemas } from "./mod.ts";

/**
 * extract pure feature of outrelation of schema
 * @param schemaName - name of schema
 * @returns return pure fetaures of schema that we have outrelation with it
 *  for example if: outrelation of schema is equal to '{
 *
 *       "comments": {
 *         schemaName: "comment",
 *         number: 50,
 *         sort: { filed: "id", order: "desc" },
 *       },
 *  }'
 *  output of this function is equal to :{
 *        "comments": array({
 *         "id": string(),
 *         "content": string(),
 *       }),
 * }
 */
export const getPureFromOutRel = (schemas: Schemas, schemaName: string) => {
  const schema = getSchema(schemas, schemaName);
  let pureSchemas = {};
  for (const property in schema.outrelation) {
    // console.log(`${property}: ${object[property]}`);
    pureSchemas = {
      ...pureSchemas,
      [property]: array(
        object(schemas[schema.outrelation[property].schemaName]?.pure),
      ),
    };
  }
  return pureSchemas;
};
