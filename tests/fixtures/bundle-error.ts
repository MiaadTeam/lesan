// TypeScript file with intentional syntax errors for bundler testing

// Missing closing brace
export function brokenFunction() {
  const x = 10;
  return x * 2;
// } <- intentionally missing

// Invalid syntax
export const invalid = this is not valid typescript;

// Undefined type
export function useUndefinedType(param: NonExistentType): string {
  return param.toString();
}

// Missing semicolon and broken syntax
export const incomplete = {
  name: "test"
  value: 123
  // missing commas
}
