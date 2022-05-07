import { Services } from "./types.ts";

/**
 * get key of services
 * @function
 */
export const getServiceKeys = (acts: Services) => () => Object.keys(acts);
