import { Type, TypeAliasDeclaration } from "../../../../deps.ts";

/**
 * @function
 * finds actual declaration from a type
 * @param type the type that we want to find own declaration
 */
export function getTypeAliasFromType(type: Type) {
  return <TypeAliasDeclaration>type.getSymbolOrThrow().getDeclarations()[0];
}
