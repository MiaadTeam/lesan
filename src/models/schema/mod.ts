import { IModel } from "../types.ts";
import { createEmbedded } from "./createEmbedded.ts";
import { createStruct } from "./createStruct.ts";
import { getPureFromMainRelations } from "./getPureFromMainRelations.ts";
import { getPureFromRelatedRelations } from "./getPureFromRelatedRelations.ts";
import { getPureOfMainRelations } from "./getPureOfMainRelations.ts";
import { getPureSchema } from "./getPureSchema.ts";
import { getSchema } from "./getSchema.ts";
import { getSchemasKeys } from "./getSchemaKeys.ts";
import { getSchemas } from "./getSchemas.ts";

export type TSchemas = Record<string, IModel>;

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const schemaFns = (schemas: TSchemas) => {
  return {
    getSchemas: () => getSchemas(schemas),
    getPureOfMainRelations: (schemaName: keyof TSchemas) =>
      getPureOfMainRelations(schemas, schemaName),
    getSchema: (schemaName: string) => getSchema(schemas, schemaName),
    getPureSchema: (schemaName: string) => getPureSchema(schemas, schemaName),
    getPureFromMainRelations: (schemaName: string) =>
      getPureFromMainRelations(schemas, schemaName),
    getPureFromRelatedRelations: (schemaName: string) =>
      getPureFromRelatedRelations(schemas, schemaName),
    createEmbedded: (schemaName: string) => createEmbedded(schemas, schemaName),
    createStruct: (schemaName: string) => createStruct(schemas, schemaName),
    getSchemasKeys: () => getSchemasKeys(schemas),
  };
};

export * from "./createEmbedded.ts";
export * from "./createStruct.ts";
export * from "./getPureFromRelatedRelations.ts";
export * from "./getPureOfMainRelations.ts";
export * from "./getPureOfMainRelations.ts";
export * from "./getPureSchema.ts";
export * from "./getSchema.ts";
export * from "./getSchemaKeys.ts";
export * from "./getSchemas.ts";
