import { array, assign, object } from "../deps.ts";
import { Model } from "./types.ts";

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const schemaFns = (schemas: Record<string, Model>) => {
    // const schema1 = {}

    /**
     * get object of schema
     * @returns all schemas
     */
    const getSchemas = () => schemas;

    /**
     * get one feature of schema by schemaName
     * @param schemaName - name of schema that we want feature
     * @returns
     * return one schema feature for example:
     *   pure: {
     *       "id": string(),
     *       "name": string(),
     *       "age": number(),
     *     },
     *     inrelation: {
     *       "posts": { schemaName: "post", type: "many" },
     *     },
     *     outrelation: {
     *       "comments": {
     *         schemaName: "comment",
     *         number: 50,
     *         sort: { filed: "id", order: "desc" },
     *       },
     *     },
     */
    const getSchema = (schemaName: string) => {
        const schema = schemas[schemaName];

        if (!schema) {
            throw new Error(`Schema ${schemaName} not found`);
        }
        return schema;
    };

    /**
     * get pure feature of one schema
     * @param schemaName - name of schema that we want pure feature
     * @returns return pure feature of schema for example:
     * {
     *       "id": string(),
     *       "name": string(),
     *       "age": number(),
     *     },
     */
    const getPureSchema = (schemaName: string) => {
        const schema = schemas[schemaName];

        if (!schema) {
            throw new Error(`Schema ${schemaName} not found`);
        }
        return schema.pure;
    };

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
    const getPureFromInRel = (schemaName: string) => {
        const schema = getSchema(schemaName);
        let pureSchemas = {};
        for (const property in schema.inrelation) {
            // console.log(`${property}: ${object[property]}`);
            pureSchemas = {
                ...pureSchemas,
                [property]: schema.inrelation[property].type === "one"
                    ? object(schemas[schema.inrelation[property].schemaName]?.pure)
                    : array(
                        object(schemas[schema.inrelation[property].schemaName]?.pure),
                    ),
            };
        }
        return pureSchemas;
    };
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
    const getPureFromOutRel = (schemaName: string) => {
        const schema = getSchema(schemaName);
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

    /**
     * create embed features, embed feature is equal to all of pure features of inerRelations and outerRelations
     * @param schemaName - name of schema
     * @returns return embedd feature of schema
     * for example
     * {
     *       "posts": array({
     *         "id": string(),
     *         "title": string(),
     *         "content": string(),
     *       }),
     *       "comments": array({
     *         "id": string(),
     *         "content": string(),
     *       }),
     * }
     */
    const createEmbedded = (schemaName: string) => {
        return {
            ...getPureFromInRel(schemaName),
            ...getPureFromOutRel(schemaName),
        };
    };
    /**
     * create struct features, struct feature is used for create client of db.
     * struct feature is include pure feature and embed features
     * @param schemaName - name of schema that we want struct feature
     * @returns return struct feature
     * for example :
     * assign(
     *       object({
     *         "id": string(),
     *         "content": string(),
     *       }),
     *       object({
     *         "user": object({
     *           "id": string(),
     *           "name": string(),
     *           "age": number(),
     *         }),
     *         "post": object({
     *           "id": string(),
     *           "title": string(),
     *           "content": string(),
     *         }),
     *       }),
     *    ),
     */
    const createStruct = (schemaName: string) => {
        const schema = getSchema(schemaName);

        return assign(object(schema.pure), object(createEmbedded(schemaName)));
    };

    return {
        getSchemas,
        getSchema,
        getPureSchema,
        getPureFromInRel,
        getPureFromOutRel,
        createEmbedded,
        createStruct,
    };
};
