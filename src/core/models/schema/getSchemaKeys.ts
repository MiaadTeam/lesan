import { TSchemas } from "./mod.ts";

export const getSchemasKeys = (schemas: TSchemas): string[] =>
  Object.keys(schemas);
