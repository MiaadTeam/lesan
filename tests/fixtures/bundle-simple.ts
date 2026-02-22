// Simple TypeScript module for bundler testing
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export const version = "1.0.0";

export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}
