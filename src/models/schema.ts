import { array, assign, object } from "https://deno.land/x/lestruct/mod.ts";
import { Model } from "./types.ts";

const schemas: Record<string, Model> = {};

export type SchemasKey = keyof typeof schemas;

export const getSchemas = () => schemas;

export const getSchema = (schemaName: SchemasKey) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema ${schemaName} not found`);
  }
  return schema;
};

export const getPureSchema = (schemaName: SchemasKey) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema ${schemaName} not found`);
  }
  return schema.pure;
};

export const getPureFromInRel = (schemaName: SchemasKey) => {
  const schema = getSchema(schemaName);
  let pureSchemas = {};
  for (const property in schema.inrelation) {
    // console.log(`${property}: ${object[property]}`);
    pureSchemas = {
      ...pureSchemas,
      [property]: schema.inrelation[property].type === "one"
        ? object(schemas[schema.inrelation[property].schemaName]?.pure)
        : array(object(schemas[schema.inrelation[property].schemaName]?.pure)),
    };
  }
  return pureSchemas;
};

export const getPureFromOutRel = (schemaName: SchemasKey) => {
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

export const createEmbedded = (schemaName: SchemasKey) => {
  return {
    ...getPureFromInRel(schemaName),
    ...getPureFromOutRel(schemaName),
  };
};

export const createStruct = (schemaName: SchemasKey) => {
  const schema = getSchema(schemaName);

  return assign(object(schema.pure), object(createEmbedded(schemaName)));
};
