import { Act, Services } from "./types.ts";

/**
 *  get Dynamic Actions of main service with schemaName
 *  @param schema - name of schema
 *  @returns dynamic Actions of specific schema of main service
 */
export const getSchemaDynamicActs = (
  acts: Services,
  schema: string,
) => {
  if (!acts.main.dynamic[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return acts.main.dynamic[schema];
};
