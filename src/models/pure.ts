import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { PureModel } from "./types.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  pure define in this function
 * @function
 * @returns - return objects of all functions that define in this function
 */
export const pureFns = (schemasObj: ISchema) => {
    /**
     * add pure feature of model to schema
     * @param name - name of schema that we want to add pure features
     * @param pureModel - key and type of model to add schema
     *
     *  @example
     *  name:"city"
     *  pureModel: {
     *    "name":string()
     *  }
     */
    const addPureModel = (name: string, pureModel: PureModel) => {
        const schemas = schemaFns(schemasObj).getSchemas();
        return schemas[name] = {
            pure: pureModel,
            inrelation: {},
            outrelation: {},
        };

        // schemas[name].pure = pureModel;
    };
    /**
     * get pure features of one schema
     * @param name - name of schema that we want to get pure feature
     */
    const getPureModel = (name: string) => {
        const schemas = schemaFns(schemasObj).getSchemas();
        return schemas[name]?.pure;
    };
    /**
     * get pure one feature of one schema by name of schema and key of feature
     * @param name - name of schema that we want to get one pure feature
     * @param key - key of feature of schema that we want to get one pure feature
     */
    const getPureModelByNameAndKey = (name: string, key: string) => {
        const schemas = schemaFns(schemasObj).getSchemas();
        const pureModel = schemas[name].pure[key];
        return pureModel;
    };

    return {
        addPureModel,
        getPureModel,
        getPureModelByNameAndKey,
    };
};
