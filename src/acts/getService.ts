import { Services } from "./mod.ts";

/**
 * get all of acts of specific service
 * @param serviceName - name of service
 */
export const getService = (acts: Services) => {
  type ServiceKeys = keyof typeof acts;
  return (serviceName: ServiceKeys) => {
    if (!acts[serviceName]) {
      throw new Error(`Invalid serviceName: ${serviceName}`);
    }
    return acts[serviceName];
  };
};
