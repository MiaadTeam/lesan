import { Acts, Services } from "./types.ts";

/**
 * get Dynamic Actions wih service key,
 * @param serviceName - name of service that we want get dynamic of Actions
 * @returns dynamic actions
 * if service doesnt have dynamic Acts throw Exception
 */
export const getDynamicActs = (acts: Services) => {
  type ServiceKeys = keyof typeof acts;
  return (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? (acts[serviceName] as Acts).dynamic
      : acts.main.dynamic;
  };
};
