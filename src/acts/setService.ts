import { Acts, Services } from "./types.ts";

/**
 * set acts to service or ser addreess to service
 *  @param serviceName - name of service
 *  @param service - type of service string or Acts
 */
export const setService = (
  acts: Services,
  serviceName: keyof typeof acts,
  service: Acts | string,
) => {
  acts[serviceName] = service;
};
