import { ISchema, PureModel, schemaFns } from "../mod.ts";

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
  schemasObj: ISchema,
  name: string,
  pureModel: PureModel,
) => {
  const schemas = schemaFns(schemasObj).getSchemas();
  return schemas[name] = {
    pure: pureModel,
    inrelation: {},
    outrelation: {},
  };

  // schemas[name].pure = pureModel;
};
