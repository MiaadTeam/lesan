import { Services } from "./types.ts";

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
export const getMainAct = (
  acts: Services,
  schema: string,
  actName: string,
) => {
  if (!acts.main[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  if (!acts.main[schema][actName]) {
    throw new Error(`Invalid actName: ${actName}`);
  }
  return acts.main[schema][actName];
};
