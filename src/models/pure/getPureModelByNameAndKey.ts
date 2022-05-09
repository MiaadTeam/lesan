import { ISchema } from "../mod.ts";
import { schemaFns } from "../schema.ts";

/**
 * get pure one feature of one schema by name of schema and key of feature
 * @param name - name of schema that we want to get one pure feature
 * @param key - key of feature of schema that we want to get one pure feature
 */
export const getPureModelByNameAndKey = (
  schemasObj: ISchema,
  name: string,
  key: string,
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  const pureModel = schemas[name].pure[key];
  return pureModel;
};
