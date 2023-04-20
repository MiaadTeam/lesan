import { ISchema, schemaFns } from "../mod.ts";
import { InRelation } from "./../types.ts";
/**
    * asign inrelation of schema that schema has relation with it example of relation of SQL that we keep foriegn key.
     * @param schemaName - Name of schema that we want add inerRealation for it
    *   @param inerRealation - record of key value of inRelation Type
    *   @example
    *   example of input parameter is
    *   {
    *    schemaName:"city",
    *    inerRealation:{
        "provice":{
            "schemaName":"provice",
            "type":"one"
        }
    *    }
    *   }
    */
export const addInrelations = (
  schemasObj: ISchema,
  { schemaName, inrelation }: {
    schemaName: string;
    inrelation: Record<string, InRelation>;
  },
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.inrelation = inrelation;
};
