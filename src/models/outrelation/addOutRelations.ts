import { ISchema } from "../mod.ts";
import { schemaFns } from "../schema.ts";
import { OutRelation } from "../types.ts";

/**
 * assign addOneOutRelation of schema.
 * outerRelation is Relationships that we do not hold the external key in SQL and usually have more than 50
 * @param schemaName - Name of schema that we want add outrelation for it
 *   @param outrelationName - name of outerRelation fields
 *   @param schemaOuterRelation - Name of schema that this schema has outrelation with it
 *   @param number - number of value that we want to keep
 *   @param sort : {field , order} - field of sort , and order of sort
 *   @example
 *   example of input parameter is
 *   {
 *     schemaName:"country",
 *     "outrelationName":"states"
 *     "schemaOuterRelation":"state"
 *  "sort":{
 *    "field":"_id",
 *    "order":"desc"
 *    "type": "number" | "date" | "objectId"
 *  }
 *   }
 */
export const addOutRelations = (
  schemasObj: ISchema,
  { schemaName, outrelation }: {
    schemaName: string;
    outrelation: Record<string, OutRelation>;
  },
) => {
  const schema = schemaFns(schemasObj).getSchemas()[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.outrelation = outrelation;
};
