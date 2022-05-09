import { Model } from "../types.ts";
import { createEmbedded } from "./createEmbedded.ts";
import { createStruct } from "./createStruct.ts";
import { getPureFromInRel } from "./getPureFromInRel.ts";
import { getPureFromOutRel } from "./getPureFromOutRel.ts";
import { getPureInRel } from "./getPureInRel.ts";
import { getPureSchema } from "./getPureSchema.ts";
import { getSchema } from "./getSchema.ts";
import { getSchemasKeys } from "./getSchemaKeys.ts";
import { getSchemas } from "./getSchemas.ts";

export type Schemas = Record<string, Model>;

/**
 * this function is create for define all things in local scope
 *  and also  all functions of  relationFns define in this function
 * @param {@link ISchema} schemasObjs - input is all record of schemas
 * @returns - return objects of all functions that define in this function
 */
export const schemaFns = (schemas: Schemas) => {
  // const schema1 = {}

  // const getPureInRel = (schemaName) => {
  //   return {};
  // };

  return {
    getSchemas: () => getSchemas(schemas),
    getPureInRel: (schemaName: string) => getPureInRel(schemas, schemaName),
    getSchema: (schemaName: string) => getSchema(schemas, schemaName),
    getPureSchema: (schemaName: string) => getPureSchema(schemas, schemaName),
    getPureFromInRel: (schemaName: string) =>
      getPureFromInRel(schemas, schemaName),
    getPureFromOutRel: (schemaName: string) =>
      getPureFromOutRel(schemas, schemaName),
    createEmbedded: (schemaName: string) => createEmbedded(schemas, schemaName),
    createStruct: (schemaName: string) => createStruct(schemas, schemaName),
    getSchemasKeys: () => getSchemasKeys(schemas),
  };
};

export * from "./createEmbedded.ts";
export * from "./createStruct.ts";
export * from "./getPureFromInRel.ts";
export * from "./getPureFromOutRel.ts";
export * from "./getPureInRel.ts";
export * from "./getPureSchema.ts";
export * from "./getSchema.ts";
export * from "./getSchemaKeys.ts";
export * from "./getSchemas.ts";
