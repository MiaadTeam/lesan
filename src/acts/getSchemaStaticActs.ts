import { Services } from "./types.ts";

/**
 *  get Static Actions of main service with schemaName
 *  @param schema - name of schema
 *  @returns static Actions of specific schema of main service
 */
export const getSchemaStaticActs = (acts: Services) =>
  (
    schema: string,
  ) => {
    if (!acts.main.static[schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.static[schema];
  };
