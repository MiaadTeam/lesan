import { Acts, Services } from "./types.ts";

/**
 * get Static Actions wih service key,
 * @param serviceName - name of service that we want get static of Actions
 * @returns static actions
 * if service doesnt have static Acts throw Exception
 */
export const getStaticActs = (acts: Services) => {
  type ServiceKeys = keyof typeof acts;
  return (serviceName?: ServiceKeys) => {
    return (serviceName && acts[serviceName] &&
        (typeof acts[serviceName] !== "string"))
      ? (acts[serviceName] as Acts).static
      : acts.main.static;
  };
};
