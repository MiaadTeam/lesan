import { throwError } from "../utils/mod.ts";
import { Acts, Services } from "./types.ts";

/**
 * get key of Static Actions wih service Name,
 * @param serviceName - name of service that we want get key of static of Actions
 * @returns key of static actions
 * if service doesnt have static Acts throw Exception
 */
export const getStaticKeys = (
  acts: Services,
  serviceName?: keyof typeof acts,
) => {
  return (serviceName && acts[serviceName] &&
      (typeof acts[serviceName] !== "string"))
    ? Object.keys((acts[serviceName] as Acts).static)
    : (serviceName === "main")
    ? Object.keys(acts.main.static)
    : throwError(`serviceName not valid : ${serviceName}`);
};
