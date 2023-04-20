import { inrelationFns } from "./inrelation/mod.ts";
import { outrelationFns } from "./outrelation/mod.ts";
import { pureFns } from "./pure/mod.ts";
import { relationFns } from "./relation/mod.ts";
import { schemaFns } from "./schema/mod.ts";
import { selectStructFns } from "./selectStruct.ts";
import { Model } from "./types.ts";

export * from "./types.ts";

// const generatedSchema = schemaFns().getSchemas();
// export type SchemasKey = keyof typeof generatedSchema;

export type ISchema = Record<string, Model>;
export const schemas = (schemas: ISchema) => {
  return {
    ...schemaFns(schemas),
    ...inrelationFns(schemas),
    ...outrelationFns(schemas),
    ...pureFns(schemas),
    ...relationFns(schemas),
    ...selectStructFns(schemas),
  };
};

export * from "./inrelation/mod.ts";
export * from "./outrelation/mod.ts";
export * from "./pure/mod.ts";
export * from "./relation/mod.ts";
export * from "./schema/mod.ts";
export * from "./selectInp.ts";
export * from "./selectStruct.ts";
