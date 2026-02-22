import { spawnSync } from "node:child_process";

const runtimes = [
  {
    name: "Node.js",
    command: "npx",
    args: ["tsx", "tests/benchmarks/odm.ts"],
  },
  {
    name: "Bun",
    command: "bun",
    args: ["run", "tests/benchmarks/odm.ts"],
  },
  {
    name: "Deno",
    command: "deno",
    args: ["run", "-A", "tests/benchmarks/odm.ts"],
  },
];

console.log("🚀 Starting Cross-Platform ODM Benchmarks...\n");

for (const runtime of runtimes) {
  console.log(`\n=========================================`);
  console.log(`🟢 Testing Runtime: ${runtime.name}`);
  console.log(`=========================================\n`);

  try {
    const result = spawnSync(runtime.command, runtime.args, {
      stdio: "inherit",
      encoding: "utf-8",
    });

    if (result.error) {
      console.error(
        `❌ Failed to run ${runtime.name} benchmark:`,
        result.error,
      );
    } else if (result.status !== 0) {
      console.error(
        `❌ ${runtime.name} benchmark exited with code ${result.status}`,
      );
    } else {
      console.log(`\n✅ ${runtime.name} benchmark completed successfully.`);
    }
  } catch (error) {
    console.error(`❌ Unexpected error running ${runtime.name}:`, error);
  }
}

console.log(`\n🎉 All ODM benchmarks finished!`);
