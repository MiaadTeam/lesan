import { Acts, Services } from "./types.ts";

/**
 * get actions of schema of specific service
 * @param service - name of service for example "main" | "ecommerce" | "blog"
 *  @param schema - name of schema
 *  @param type - type of actions of service dynamic or static
 */
export const getActsKeys = (
  acts: Services,
  service: keyof typeof acts,
  schema: string,
) => {
  if (!acts[service] && typeof acts[service] === "string") {
    throw new Error(
      `Invalid service name: ${service} `,
    );
  }
  if (!(acts[service] as Acts)) {
    throw new Error(
      `Invalid service name: ${service} `,
    );
  }
  if (!(acts[service] as Acts)[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  return Object.keys((acts[service] as Acts)[schema]);
};
