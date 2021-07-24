import {
  InterfaceDeclaration,
  EnumDeclaration,
  TypeAliasDeclaration,
  log,
  Type,
} from "../../../../deps.ts";

/**
 * @function
 * change name of a node and its references
 * @param node the node that we want to rename it and own references
 */
export function changeNameAndItsRefs(
  node: InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration,
  type: "static" | "dynamic" | "response" = "dynamic"
) {
  try {
    //we use split for remove some postfixes for example authority.embedded.ts
    const fileName = node
      .getSourceFile()
      .getBaseNameWithoutExtension()
      .split(".")[0];
    //generate new name
    const newName = `FQl_${type}_${fileName}_${node.getName()}`;

    //rename node and its refs
    node.rename(newName, {
      renameInStrings: true,
      usePrefixAndSuffixText: true,
    });
  } catch (error) {
    log.warning(
      `we have some problem in renaming declaration: ${node.getName()}. please check declaration and file name again  `
    );
  }
}
