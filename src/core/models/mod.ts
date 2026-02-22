import { createProjection, TProjectionType } from "./createProjection.ts";
import { mainRelationsFns } from "./mainRelations/mod.ts";
import { pureFns } from "./pure/mod.ts";
import { relatedRelationFns } from "./relatedRelations/mod.ts";
import { relationFns } from "./relation/mod.ts";
import { schemaFns, TSchemas } from "./schema/mod.ts";
import { selectStructFns } from "./selectStruct.ts";

export * from "./types.ts";

// const generatedSchema = schemaFns().getSchemas();
// export type SchemasKey = keyof typeof generatedSchema;

export const schemas = (schemas: TSchemas) => {
  return {
    ...schemaFns(schemas),
    ...mainRelationsFns(schemas),
    ...relatedRelationFns(schemas),
    ...pureFns(schemas),
    ...relationFns(schemas),
    ...selectStructFns(schemas),
    createProjection: (schemaName: string, projectionType: TProjectionType) =>
      createProjection(schemas, schemaName, projectionType),
  };
};

export * from "./mainRelations/mod.ts";
export * from "./pure/mod.ts";
export * from "./relatedRelations/mod.ts";
export * from "./relation/mod.ts";
export * from "./schema/mod.ts";
export * from "./selectInp.ts";
export * from "./selectStruct.ts";
