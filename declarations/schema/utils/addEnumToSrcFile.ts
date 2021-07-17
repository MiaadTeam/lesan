import { EnumDeclaration, SourceFile } from "../../../deps.ts";
import { changeNameAndItsRefs } from "./ts-morph/mod.ts";

/**
 * @function
 * add an enum to specified sourcefile and also rename it to be unique
 * @param myInterface the interface that we want to add it to sourcefile
 * @param createdSourceFile reference of created sourcefile that we want to add the interface to it
 */
export function addFunQLEnumToSourceFile(
  myEnum: EnumDeclaration,
  createdSourceFile: SourceFile,
  options: { type?: "dynamic" | "static" | "return" } = { type: "dynamic" }
) {
  //extract options
  const { type } = options;

  //checks enum name is duplicate or not
  if (
    //return when enum was inserted to source file
    myEnum.getName().startsWith("FQl")
  ) {
    return;
  }

  //checks enum name is duplicate or not
  if (myEnum.getName().startsWith("FunQl")) {
    return;
  } else {
    //change name of interface first
    changeNameAndItsRefs(myEnum, type);
  }
  //even enum is not exported we export it
  createdSourceFile.addEnum({ ...myEnum.getStructure(), isExported: true });
}
