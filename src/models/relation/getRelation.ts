import { ISchema } from "../mod.ts";
import { schemaFns } from "../schema.ts";

/**
 * get inerRelatrion or outerRealtion of one schema
 * @param name - name of schema
 * @param relationType - type of relation that we want (inerRelatrion or outrelation)
 */
export const getRelation = (
  schemasObjs: ISchema,
  name: string,
  relationType: "inrelation" | "outrelation",
) => {
  const schemas = schemaFns(schemasObjs).getSchemas();
  return schemas[name][relationType];
};
