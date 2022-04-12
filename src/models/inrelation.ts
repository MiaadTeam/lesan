import { getSchemas } from "./schema.ts";
import { InRelation } from "./types.ts";

const schemas = getSchemas();

export const addInrelations = (
  { schemaName, inrelation }: {
    schemaName: string;
    inrelation: Record<string, InRelation>;
  },
) => {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.inrelation = inrelation;
};

export const addOneInRelation = (
  { schemaName, inrelationName, type }: {
    schemaName: string;
    inrelationName: string;
    type: "one" | "many";
  },
) => {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.inrelation = {
    ...schema.inrelation,
    [inrelationName]: { schemaName, type },
  };
};

export const getInrelations = (schemaName: string) =>
  schemas[schemaName].inrelation;
