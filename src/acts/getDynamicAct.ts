import { Act, Services } from "./types.ts";

/**
 *  get specific Dynamic Action of main service with schemaName and actName
 *  @param schema - name of schema for example: user
 *  @param actName - name of Actions for example: create
 *  @returns
 *  return specific action of schema
 *  @example
 *  for example output is:
 *      {
 *         validator: (input: any) => {
 *           return true;
 *         },
 *         fn: (input: any) => {
 *           return input;
 *         },
 *        }
 */
export const getDynamicAct = (
  acts: Services,
  schema: string,
  actName: string,
) => {
  if (!acts.main.dynamic[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  if (!acts.main.dynamic[schema][actName]) {
    throw new Error(`Invalid actName: ${actName}`);
  }
  return acts.main.dynamic[schema][actName];
};
