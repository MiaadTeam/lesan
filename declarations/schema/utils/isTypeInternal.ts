/**
 * specifies whether this type is belongs to internal js type or not
 * @param typeName name of type
 * @todo should add new name of types
 */
export function isInternalType(typeName: string) {
  return typeName === "Date";
}
