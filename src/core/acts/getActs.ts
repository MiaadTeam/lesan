import { Act, Services } from "./types.ts";

/**
 * get actions of schema of main service
 *  @param schema - name of schema
 *  @param type - type of sctions of service dynamic or static
 */
export const getActs = (
  acts: Services,
  schema: string,
): Record<string, Act> => {
  if (!acts.main[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return acts.main[schema];
};
