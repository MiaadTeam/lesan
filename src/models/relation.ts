import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";

export const relationFns = (schemasObjs: ISchema) => {
  const getRelation = (
    name: string,
    relationType: "inrelation" | "outrelation",
  ) => {
    const schemas = schemaFns(schemasObjs).getSchemas();
    return schemas[name][relationType];
  };

  return {
    getRelation,
  };
};
