import { getSchemas, SchemasKey } from "./schema.ts";
import { PureModel } from "./types.ts";

const schemas = getSchemas();

export const addPureModel = (name: string, pureModel: PureModel) => {
  schemas[name] = {
    pure: pureModel,
    inrelation: {},
    outrelation: {},
  };
  // schemas[name].pure = pureModel;
};

export const getPureModel = (name: SchemasKey) => schemas[name].pure;

export const getPureModelByNameAndKey = (name: string, key: string) => {
  const pureModel = schemas[name].pure[key];
  return pureModel;
};
