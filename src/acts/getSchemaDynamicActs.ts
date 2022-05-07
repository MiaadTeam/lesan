import { Act, Services } from "./types.ts";

/**
 *  get Dynamic Actions of main service with schemaName
 *  @param schema - name of schema
 *  @returns dynamic Actions of specific schema of main service
 */
type GetSchmaStaticActs = (
  schema: string,
) => { [key: string]: Act };
export const getSchemaDynamicActs = (acts: Services): GetSchmaStaticActs =>
  (
    schema,
  ) => {
    if (!acts.main.dynamic[schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main.dynamic[schema];
  };
