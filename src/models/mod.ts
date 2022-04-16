import { contextFns } from "./context.ts";
import { inrelationFns } from "./inrelation.ts";
import { outrelationFns } from "./outrelation.ts";
import { pureFns } from "./pure.ts";
import { relationFns } from "./relation.ts";
import { schemaFns } from "./schema.ts";
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
    ...contextFns(),
    ...outrelationFns(schemas),
    ...pureFns(schemas),
    ...relationFns(schemas),
    ...selectStructFns(schemas),
  };
};
