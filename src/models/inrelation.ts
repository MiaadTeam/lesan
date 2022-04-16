import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { InRelation } from "./types.ts";

export const inrelationFns = (schemasObj: ISchema) => {
  const addInrelations = (
    { schemaName, inrelation }: {
      schemaName: string;
      inrelation: Record<string, InRelation>;
    },
  ) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    const schema = schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.inrelation = inrelation;
  };

  const addOneInRelation = (
    { schemaName, inrelationName, type }: {
      schemaName: string;
      inrelationName: string;
      type: "one" | "many";
    },
  ) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    const schema = schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} does not exist`);
    }
    schema.inrelation = {
      ...schema.inrelation,
      [inrelationName]: { schemaName, type },
    };
  };

  const getInrelations = (schemaName: string) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    schemas[schemaName].inrelation;
  };

  return {
    addInrelations,
    addOneInRelation,
    getInrelations,
  };
};
