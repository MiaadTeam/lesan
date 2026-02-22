# Lesan Cross-Platform Benchmarks

This document outlines the performance benchmarks for the Lesan framework across its supported runtimes: **Node.js**, **Bun**, and **Deno**. 

The benchmarks are divided into two main categories:
1. **HTTP Server Throughput:** Measures the Requests Per Second (RPS) and latency of the underlying HTTP server adapters.
2. **ODM Operations:** Measures the execution speed of Lesan's Object Document Mapper (ODM) for database operations (Insert, Find, Update, Delete).

---

## 1. HTTP Server Throughput

These benchmarks measure the raw HTTP throughput of Lesan's server using `autocannon`. The tests were run with 100 concurrent connections for 10 seconds per scenario.

### Scenarios
* **Hello World (Sync):** A simple endpoint returning a static JSON object.
* **Async Task (10ms delay):** An endpoint that simulates a 10ms asynchronous database or network call before returning.
* **Echo Payload:** An endpoint that parses an incoming JSON payload and echoes a property back.

### Results

| Runtime | Scenario | Req/Sec | Latency (ms) | Errors |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js** | Hello World (Sync) | ~2,991 | 32.92 | 0 |
| **Node.js** | Async Task (10ms delay) | ~3,287 | 29.91 | 0 |
| **Node.js** | Echo Payload | ~3,240 | 30.35 | 0 |
| **Bun** | Hello World (Sync) | ~10,698 | 8.88 | 0 |
| **Bun** | Async Task (10ms delay) | ~10,562 | 9.00 | 0 |
| **Bun** | Echo Payload | ~10,713 | 8.87 | 0 |
| **Deno** | Hello World (Sync) | ~8,316 | 11.53 | 0 |
| **Deno** | Async Task (10ms delay) | ~10,147 | 9.39 | 0 |
| **Deno** | Echo Payload | ~10,294 | 9.24 | 0 |

### Analysis
* **Bun** provides the highest raw HTTP throughput and the lowest latency, consistently handling over 10,500 requests per second.
* **Deno** is a very close second, especially in asynchronous and payload-parsing scenarios, handling around 10,000 requests per second.
* **Node.js** is the baseline, handling around 3,000 requests per second. While slower than Bun and Deno, it remains highly stable and reliable for production workloads.

---

## 2. ODM Operations

These benchmarks measure the performance of Lesan's core ODM logic. The tests perform operations on 1,000 documents using an in-memory MongoDB instance (`mongodb-memory-server`).

### Scenarios
* **insertOne (Sequential):** Inserting 1,000 documents one by one in a loop.
* **insertMany (Batch):** Inserting 1,000 documents in a single batch operation.
* **find (Fetch All):** Fetching 1,000 documents in a single query.
* **updateOne (Sequential):** Updating 1,000 documents one by one in a loop.
* **deleteOne (Sequential):** Deleting 1,000 documents one by one in a loop.

### Results (Operations Per Second)

| Operation | Node.js (ops/sec) | Bun (ops/sec) | Deno (ops/sec) |
| :--- | :--- | :--- | :--- |
| **insertOne** (Sequential) | ~1,679 | ~1,764 | ~2,092 |
| **insertMany** (Batch) | ~33,737 | ~32,041 | ~27,145 |
| **find** (Fetch All) | ~3,173 | ~2,508 | ~3,017 |
| **updateOne** (Sequential) | ~1,880 | ~2,131 | ~2,335 |
| **deleteOne** (Sequential) | ~1,092 | ~902 | ~1,162 |

### Analysis
* **Batch Operations:** `insertMany` is exponentially faster than sequential inserts across all runtimes, highlighting the efficiency of MongoDB's bulk operations. Node.js slightly edged out the others in batch insertion speed.
* **Sequential Operations:** Deno and Bun generally outperform Node.js in sequential operations (`insertOne`, `updateOne`, `deleteOne`), likely due to faster event loop execution and Promise resolution in V8/JavaScriptCore.
* **Overall:** The ODM performance is heavily bound by the MongoDB driver and the database itself. Lesan's abstraction layer adds minimal overhead, ensuring that database operations remain fast regardless of the chosen runtime.

---

## How to Run Benchmarks

You can run these benchmarks yourself using the scripts provided in the repository.

Ensure you have `autocannon` installed globally or available via `npx`, and that you have Node.js, Bun, and Deno installed on your system.

```bash
# Run all benchmarks
npm run bench

# Run only HTTP benchmarks
npm run bench:http

# Run only ODM benchmarks
npm run bench:odm
```
