import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { InRelation } from "./types.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of inrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const inrelationFns = (schemasObj: ISchema) => {
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
  const addInrelations = (
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
  const addOneInRelation = (
    { schemaName, inrelationName, schemaInRelation, type }: {
      schemaName: string;
      inrelationName: string;
      schemaInRelation: string;
      type: "one" | "many";
    },
  ) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    const schema = schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.inrelation = {
      ...schema.inrelation,
      [inrelationName]: { schemaName: schemaInRelation, type },
    };
  };

  /**
   * get all of inerRealation of one schema
   * @param schemaName - name of schema that we want inerRealation of it
   */
  const getInrelations = (schemaName: string) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    schemas[schemaName].inrelation;
  };

  return {
    addInrelations,
    addOneInRelation,
    getInrelations,
  };
};
