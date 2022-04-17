import { array, assign, object } from "../deps.ts";
import { Model } from "./types.ts";

export const schemaFns = (schemas: Record<string, Model>) => {
  // const schema1 = {}
  const getSchemas = () => schemas;

  const getSchema = (schemaName: string) => {
    const schema = schemas[schemaName];

    if (!schema) {
      throw new Error(`Schema ${schemaName} not found`);
    }
    return schema;
  };

  const getPureSchema = (schemaName: string) => {
    const schema = schemas[schemaName];

    if (!schema) {
      throw new Error(`Schema ${schemaName} not found`);
    }
    return schema.pure;
  };

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

  const createEmbedded = (schemaName: string) => {
    return {
      ...getPureFromInRel(schemaName),
      ...getPureFromOutRel(schemaName),
    };
  };

  const createStruct = (schemaName: string) => {
    const schema = getSchema(schemaName);

    return assign(object(schema.pure), object(createEmbedded(schemaName)));
  };

  const getSchemasKeys = () => Object.keys(schemas);

  return {
    getSchemas,
    getSchema,
    getPureSchema,
    getPureFromInRel,
    getPureFromOutRel,
    createEmbedded,
    createStruct,
    getSchemasKeys,
  };
};
