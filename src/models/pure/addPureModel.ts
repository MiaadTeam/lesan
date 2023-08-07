import { PureFields, schemaFns, TSchemas } from "../mod.ts";

/**
 * add pure feature of model to schema
 * @param name - name of schema that we want to add pure features
 * @param pureModel - key and type of model to add schema
 *
 *  @example
 *  name:"city"
 *  pureModel: {
 *    "name":string()
 *  }
 */
export const addPureModel = (
  schemasObj: TSchemas,
  name: string,
  pureModel: PureFields,
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[name] = {
    pure: pureModel,
    relations: {},
    mainRelations: {},
    relatedRelations: {},
  };

  // schemas[name].pure = pureModel;
};
