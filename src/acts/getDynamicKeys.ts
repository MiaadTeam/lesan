import { throwError } from "../utils/mod.ts";
import { Acts, Services } from "./types.ts";

/**
 * get key of Dynamic Actions wih service Name,
 * @param serviceName - name of service that we want get key of dynamic of Actions
 * @returns key of dynamic actions
 * if service doesnt have static Acts throw Exception
 */
export const getDynamicKeys = (
  acts: Services,
  serviceName: keyof typeof acts,
) =>
  (serviceName && acts[serviceName] &&
      (typeof acts[serviceName] !== "string"))
    ? Object.keys((acts[serviceName] as Acts).dynamic)
    : (serviceName === "main")
    ? Object.keys(acts.main.dynamic)
    : throwError(`serviceName not valid : ${serviceName}`);
