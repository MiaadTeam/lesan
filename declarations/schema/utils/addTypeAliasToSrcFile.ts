import { changeNameAndItsRefs } from "./ts-morph/mod.ts";
import {
  TypeAliasDeclaration,
  SourceFile,
  SyntaxKind,
  log,
} from "../../../deps.ts";
import { addNodeInnerTypeToSrcFile } from "./mod.ts";

/**
 * @function
 * add a type alias to specified sourcefile with all dependencies and also rename it to be unique
 * @param myAliasType the type alias that we want to add it to sourcefile
 * @param createdSourceFile reference of created sourcefile that we want to add the dependencies to it
 */
export function addFunQLAliasTypeToSourceFile(
  myAliasType: TypeAliasDeclaration,
  createdSourceFile: SourceFile,
  options: { type?: "dynamic" | "static" | "response" } = { type: "dynamic" }
) {
  //extract options
  const { type } = options;

  //checks type alias name is duplicate or not
  if (
    //when type alias was inserted to source file
    myAliasType.getName().startsWith("FQl")
  ) {
    return;
  } else {
    //change name of type alias first
    changeNameAndItsRefs(myAliasType, type);
  }

  //create new type alias with new name
  const createdTypeAlias = createdSourceFile.addTypeAlias({
    ...myAliasType.getStructure(),
    isExported: true,
  });

  //find all type references that should be handled for renaming name and ...
  for (const node of createdTypeAlias.getDescendantsOfKind(
    SyntaxKind.TypeReference
  )) {
    //handle when type of node is Bson.ObjectId or similar to it
    //map it to string type
    if (node.getText().match(/(Bson.)?ObjectI[dD]/)) {
      node.replaceWithText("string");
    }
    //construct deps of type alias in node
    addNodeInnerTypeToSrcFile(node, createdSourceFile, { type });
  }
}
