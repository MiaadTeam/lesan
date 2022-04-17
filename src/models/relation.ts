import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const relationFns = (schemasObjs: ISchema) => {
    /**
     * get inerRelatrion or outerRealtion of one schema
     * @param name - name of schema
     * @param relationType - type of relation that we want (inerRelatrion or outrelation)
     */
    const getRelation = (
        name: string,
        relationType: "inrelation" | "outrelation",
    ) => {
        const schemas = schemaFns(schemasObjs).getSchemas();
        return schemas[name][relationType];
    };

    return {
        getRelation,
    };
};
