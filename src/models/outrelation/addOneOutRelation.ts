import { ISchema } from "../mod.ts";
import { schemaFns } from "../schema.ts";

/**
 * add addOneOutRelation to previous outrelation of schema.
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
 *  }
 *   }
 */
export const addOneOutRelation = (
  schemasObj: ISchema,
  { schemaName, outrelationName, schemaOuterRelation, number, sort }: {
    schemaName: string;
    outrelationName: string;
    schemaOuterRelation: string;
    number: number;
    sort: {
      field: string;
      order: "asc" | "desc";
      type: "number" | "date" | "objectId";
    };
  },
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }

  schema.outrelation = {
    ...schema.outrelation,
    [outrelationName]: { schemaName: schemaOuterRelation, number, sort },
  };
};
