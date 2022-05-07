import { Services } from "./types.ts";

/**
 * get actions of schema of main service
 *  @param schema - name of schema
 *  @param type - type of sctions of service dynamic or static
 */
export const getActs = (acts: Services) =>
  (type: "static" | "dynamic", schema: string) => {
    if (!acts.main[type]) {
      throw new Error(
        `Invalid action type: ${type} it just include dynamic and static`,
      );
    }
    if (!acts.main[type][schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return acts.main[type][schema];
  };
