import { Acts, Services } from "./types.ts";

/**
 * get actions of schema of specific service
 * @param service - name of service for example "main" | "ecommerce" | "blog"
 *  @param schema - name of schema
 *  @param type - type of actions of service dynamic or static
 */
export const getActsKeys = (acts: Services) => {
  type ServiceKeys = keyof typeof acts;
  return (
    service: ServiceKeys,
    type: "static" | "dynamic",
    schema: string,
  ) => {
    if (!acts[service] && typeof acts[service] === "string") {
      throw new Error(
        `Invalid service name: ${service} `,
      );
    }
    if (!(acts[service] as Acts)[type]) {
      throw new Error(
        `Invalid action type: ${type} it just include dynamic and static`,
      );
    }
    if (!(acts[service] as Acts)[type][schema]) {
      throw new Error(`Invalid schema: ${schema}`);
    }
    return Object.keys((acts[service] as Acts)[type][schema]);
  };
};
