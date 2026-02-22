// TypeScript module with imports for bundler testing
import { greet, version } from "./bundle-simple.ts";

export function welcomeMessage(name: string): string {
  const greeting = greet(name);
  return `${greeting} (v${version})`;
}

export function getAppInfo() {
  return {
    name: "Test App",
    version: version,
    timestamp: Date.now(),
  };
}
