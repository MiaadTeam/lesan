import { Type, TypeAliasDeclaration, SyntaxKind } from "../../../../deps.ts";

/**
 * @function
 * finds actual declaration from a type
 * @param type the type that we want to find own declaration
 * @note get declaration only get type literal then we should find type alias
 */
export function getTypeAliasFromType(type: Type) {
  return <TypeAliasDeclaration>(
    type
      .getSymbolOrThrow()
      .getDeclarations()[0]
      .getFirstAncestorByKindOrThrow(SyntaxKind.TypeAliasDeclaration)
  );
}
