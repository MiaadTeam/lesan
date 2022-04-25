import { schemaFns } from "../../models/schema.ts";

export const checkRelation = (
  schemaName: string,
  schemaInrel: string[],
  schema: Record<string, any>,
) => {
  Object.keys(schemaInrel).forEach(key => {
    // Object.keys(foundedSchema.outrelation).includes(schemaName) ?
  });
};
