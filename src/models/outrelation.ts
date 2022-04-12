import { getSchemas } from "./schema.ts";
import { OutRelation } from "./types.ts";

const schemas = getSchemas();

export const addOneOutRelation = (
  { schemaName, outrelationName, number, sort }: {
    schemaName: string;
    outrelationName: string;
    number: number;
    sort: {
      field: string;
      order: "asc" | "desc";
    };
  },
) => {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.outrelation = {
    ...schema.outrelation,
    [outrelationName]: { schemaName, number, sort },
  };
};

export const addOutRelations = (
  { schemaName, outrelation }: {
    schemaName: string;
    outrelation: Record<string, OutRelation>;
  },
) => {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Schema ${schemaName} does not exist`);
  }
  schema.outrelation = outrelation;
};

export const getOutRelations = (schemaName: string) =>
  schemas[schemaName].outrelation;
