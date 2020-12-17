const content = `
import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

export const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});
`;

export const createRedis = async (init: string) => {
  await Deno.writeTextFile(`${init}/redis.ts`, content);
};
