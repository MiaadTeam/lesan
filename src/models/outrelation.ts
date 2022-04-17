import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { OutRelation } from "./types.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of outrelation define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const outrelationFns = (schemasObj: ISchema) => {
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
    const addOneOutRelation = (
        { schemaName, outrelationName, schemaOuterRelation, number, sort }: {
            schemaName: string;
            outrelationName: string;
            schemaOuterRelation: string;
            number: number;
            sort: {
                field: string;
                order: "asc" | "desc";
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
     *  }
     *   }
     */
    const addOutRelations = (
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
    /**
     * getOutRelations of one schema
     * @param schemaName - name of schema that we want outerRelations
     */
    const getOutRelations = (schemaName: string) => {
        const schemas = schemaFns(schemasObj).getSchemas();
        return schemas[schemaName].outrelation;
    };

    return {
        addOneOutRelation,
        addOutRelations,
        getOutRelations,
    };
};
