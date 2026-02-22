import { execSync, spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const runtimes = [
  {
    name: "Node.js",
    command: "npx",
    args: ["tsx", "tests/benchmarks/server.ts"],
  },
  { name: "Bun", command: "bun", args: ["run", "tests/benchmarks/server.ts"] },
  {
    name: "Deno",
    command: "deno",
    args: ["run", "-A", "tests/benchmarks/server.ts"],
  },
];

const payloads = [
  {
    name: "Hello World (Sync)",
    body: JSON.stringify({
      service: "main",
      model: "benchmark",
      act: "hello",
      set: {},
      get: {},
    }),
  },
  {
    name: "Async Task (10ms delay)",
    body: JSON.stringify({
      service: "main",
      model: "benchmark",
      act: "asyncTask",
      set: {},
      get: {},
    }),
  },
  {
    name: "Echo Payload",
    body: JSON.stringify({
      service: "main",
      model: "benchmark",
      act: "echo",
      set: { text: "Hello Performance Test!" },
      get: {},
    }),
  },
];

const PORT = 8080;
const URL = `http://localhost:${PORT}/lesan`;
const DURATION = 10; // seconds per test
const CONNECTIONS = 100; // concurrent connections

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runBenchmark() {
  console.log("🚀 Starting Cross-Platform HTTP Benchmarks...\n");
  const results: Record<string, any> = {};

  for (const runtime of runtimes) {
    console.log(`\n=========================================`);
    console.log(`🟢 Testing Runtime: ${runtime.name}`);
    console.log(`=========================================\n`);

    results[runtime.name] = {};

    // Start the server
    const serverProcess = spawn(runtime.command, runtime.args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let serverReady = false;

    serverProcess.stdout.on("data", (data) => {
      if (data.toString().includes("HTTP webserver running")) {
        serverReady = true;
      }
    });

    serverProcess.stderr.on("data", (data) => {
      console.error(`[${runtime.name} Error]: ${data.toString()}`);
    });

    // Wait for server to start
    let attempts = 0;
    while (!serverReady && attempts < 50) {
      await sleep(100);
      attempts++;
    }

    if (!serverReady) {
      console.error(`❌ Failed to start ${runtime.name} server.`);
      serverProcess.kill();
      continue;
    }

    console.log(`✅ ${runtime.name} server is ready. Running tests...\n`);

    for (const payload of payloads) {
      console.log(`➡️  Scenario: ${payload.name}`);
      try {
        // Run autocannon
        const cmd =
          `npx autocannon -c ${CONNECTIONS} -d ${DURATION} -m POST -H "Content-Type: application/json" -b '${payload.body}' --json ${URL}`;
        const output = execSync(cmd, {
          encoding: "utf-8",
          stdio: ["ignore", "pipe", "ignore"],
        });

        const result = JSON.parse(output);
        console.log(`   Requests/sec: ${result.requests.average}`);
        console.log(`   Latency (ms): ${result.latency.average}`);

        results[runtime.name][payload.name] = {
          requestsPerSecond: result.requests.average,
          latencyMs: result.latency.average,
          totalRequests: result.requests.total,
          errors: result.errors,
          timeouts: result.timeouts,
        };
      } catch (error) {
        console.error(`❌ Error running benchmark for ${payload.name}:`, error);
      }
      await sleep(1000); // Cool down between tests
    }

    // Kill the server
    serverProcess.kill();
    await sleep(2000); // Wait for port to be freed before starting the next runtime
  }

  // Print Summary
  console.log(`\n=========================================`);
  console.log(`📊 Benchmark Summary`);
  console.log(`=========================================\n`);

  const tableData = Object.entries(results).reduce((acc, [runtime, tests]) => {
    for (const [testName, metrics] of Object.entries(tests as any)) {
      acc[`${runtime} - ${testName}`] = {
        "Req/Sec": (metrics as any).requestsPerSecond,
        "Latency (ms)": (metrics as any).latencyMs,
        "Errors": (metrics as any).errors,
      };
    }
    return acc;
  }, {} as Record<string, any>);

  console.table(tableData);

  writeFileSync(
    "tests/benchmarks/results.json",
    JSON.stringify(results, null, 2),
  );
  console.log("\n💾 Results saved to tests/benchmarks/results.json");
}

runBenchmark().catch(console.error);
