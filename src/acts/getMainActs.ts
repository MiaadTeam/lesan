import { Services } from "./types.ts";

/**
 * get acts of main service
 * @function
 */
export const getMainActs = (acts: Services) => () => acts.main;
