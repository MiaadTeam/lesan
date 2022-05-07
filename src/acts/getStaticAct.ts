import { Services } from "./types.ts";

/**
 *  get specific Static Action of main service with schemaName and actName
 *  @param schema - name of schema for example: user
 *  @param actName - name of Actions for example: create
 *  @returns
 *  return specific action of schema
 */
export const getStaticAct = (acts: Services) =>
  (schema: string, actName: string) => {
    if (!acts.main.static[schema]) {
      throw new Error(`Invalid actName: ${actName}`);
    }
    if (!acts.main.static[schema][actName]) {
      throw new Error(`Invalid actName: ${actName}`);
    }
    return acts.main.static[schema][actName];
  };
