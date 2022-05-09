import { ISchema } from "../mod.ts";
import { schemaFns } from "../schema.ts";

/**
 * add one innerRelation to previous inrelation of schema that schema has relation with it example of relation of SQL that we keep foriegn key.
 * @param schemaName - Name of schema that we want add inerRealation for it
 *   @param inerRealationName - name of inerRealtion fields
 *   @param schemaInRelation - Name of schema that this schema has inerRealation with it
 *   @example
 *   example of input parameter is
 *   {
 *     schemaName:"city",
 *     "inrelationName":"provice"
 *     "schemaInRelation":"provice"
 *     "type":"one"
 *   }
 */
export const addOneInRelation = (
  schemasObj: ISchema,
  { schemaName, inrelationName, schemaInRelation, type, optional }: {
    schemaName: string;
    inrelationName: string;
    schemaInRelation: string;
    type: "one" | "many";
    optional: boolean;
  },
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.inrelation = {
    ...schema.inrelation,
    [inrelationName]: { schemaName: schemaInRelation, type, optional },
  };
};
