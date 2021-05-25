import { InterfaceDeclaration, Type } from "../../../../deps.ts";

export function getInterfaceFromType(type: Type) {
  return <InterfaceDeclaration>type.getSymbolOrThrow().getDeclarations()[0];
}
