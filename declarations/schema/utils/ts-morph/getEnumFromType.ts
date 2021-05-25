import { Type, EnumDeclaration } from "../../../../deps.ts";

export function getEnumFromType(type: Type) {
  return <EnumDeclaration>type.getSymbolOrThrow().getDeclarations()[0];
}
