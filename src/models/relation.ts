import { getSchemas, SchemasKey } from "./schema.ts";

const schemas = getSchemas();

export const getRelation = (
  name: SchemasKey,
  relationType: "inrelation" | "outrelation",
) => schemas[name][relationType];
