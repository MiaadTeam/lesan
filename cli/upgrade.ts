import { log } from "../deps.ts";

/**
 * upgrade funql cli
 * @param version
 */
export async function upgrade(version?: string): Promise<void> {
  const url =
    version && version !== "latest"
      ? `https://deno.land/x/funql@${version}/funql.ts`
      : "https://deno.land/x/funql/funql.ts";

  log.info(`Checking if ${url} exists`);
  if ((await fetch(url)).status !== 200) {
    log.error(`Upgrade url ${url} does not exist`);
    Deno.exit(1);
  }

  log.info(
    `Running \`deno install -qAfr allow-read allow-write --unstable ${url}\``
  );
  await Deno.run({
    cmd: [
      "deno",
      "install",
      "-qAfr",
      "--allow-read",
      "--allow-write",
      "--unstable",
      url,
    ],
    stdout: undefined,
  }).status();
  Deno.exit(0);
}
