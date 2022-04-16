import { ISchema } from "./mod.ts";
import { schemaFns } from "./schema.ts";
import { PureModel } from "./types.ts";

export const pureFns = (schemasObj: ISchema) => {
  const addPureModel = (name: string, pureModel: PureModel) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    return schemas[name] = {
      pure: pureModel,
      inrelation: {},
      outrelation: {},
    };

    // schemas[name].pure = pureModel;
  };

  const getPureModel = (name: string) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    return schemas[name]?.pure;
  };

  const getPureModelByNameAndKey = (name: string, key: string) => {
    const schemas = schemaFns(schemasObj).getSchemas();
    const pureModel = schemas[name].pure[key];
    return pureModel;
  };

  return {
    addPureModel,
    getPureModel,
    getPureModelByNameAndKey,
  };
};
