import {
  InterfaceDeclaration,
  EnumDeclaration,
  TypeAliasDeclaration,
} from "../../../../deps.ts";

/**
 * @function
 * change name of a node and its references
 * @param node the node that we want to rename it and own references
 */
export function changeNameAndItsRefs(
  node: InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration
) {
  //we use split for remove some postfixes for example authority.embedded.ts
  const fileName = node
    .getSourceFile()
    .getBaseNameWithoutExtension()
    .split(".")[0];
  //generate new name
  const newName = `FunQl_${node.getName()}_${fileName}`;

  //rename node and its refs
  node.rename(newName, { renameInStrings: true, usePrefixAndSuffixText: true });
}
