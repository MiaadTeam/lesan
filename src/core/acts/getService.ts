import { Acts, Services } from "./types.ts";

/**
 * get all of acts of specific service
 * @param serviceName - name of service
 */
export const getService = (
  acts: Services,
  serviceName: keyof typeof acts,
): Acts | string | undefined => {
  if (!acts[serviceName]) {
    throw new Error(`Invalid serviceName: ${serviceName}`);
  }
  return acts[serviceName];
};
