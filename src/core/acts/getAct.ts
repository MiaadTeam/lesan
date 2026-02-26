import { Acts, Services } from "./types.ts";

/**
 * get specific action of schema of specific service
 * @param service - name of service for example "main" | "ecommerce" | "blog"
 *  @param schema - name of schema
 *  @param type - type of actions of service dynamic or static
 *  @param actName - name of actions
 */
export function getAct(
  acts: Services,
  service: keyof typeof acts,
  schema: string,
  actName: string,
) {
  if (!acts[service] && typeof acts[service] === "string") {
    throw new Error(
      `Invalid service name: ${service} `,
    );
  }
  if (!(acts[service])) {
    throw new Error(
      `Invalid service: can not find ${service} service`,
    );
  }
  if (!(acts[service] as Acts)[schema]) {
    throw new Error(`Invalid schema: ${schema}`);
  }
  if (!(acts[service] as Acts)[schema][actName]) {
    throw new Error(`Invalid action name: ${actName}`);
  }
  return (acts[service] as Acts)[schema][actName];
}
