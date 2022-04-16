import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { OutRelation } from "./types.ts";

export const outrelationFns = (schemasObj: ISchema) => {
  const addOneOutRelation = (
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
    const schemas = schemaFns(schemasObj).getSchemas();
    const schema = schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.outrelation = {
      ...schema.outrelation,
      [outrelationName]: { schemaName, number, sort },
    };
  };

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
