/**
 * specifies whether this type is belongs to internal js type or not
 * @param typeName name of type
 * @todo should add new name of types
 */
export function isInternalType(typeName: string) {
  return (
    typeName === "Date" ||
    typeName.startsWith("Promise") ||
    typeName.startsWith("Partial") ||
    typeName === "object" ||
    typeName === "string" ||
    typeName === "number" ||
    typeName === "boolean" ||
    typeName === "any" ||
    typeName === "undefined" ||
    typeName === "null" ||
    typeName === "Array"
  );
}
