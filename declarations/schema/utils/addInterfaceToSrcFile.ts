import { SourceFile, InterfaceDeclaration } from "../../../deps.ts";
import { isInternalType, handlePropType } from "./mod.ts";
import {
  changeNameAndItsRefs,
  findAllPropsOfInterface,
} from "./ts-morph/mod.ts";

/**
 * @function
 * add an interface to specified sourcefile with all dependencies and also rename it to be unique
 * @param myInterface the interface that we want to add it to sourcefile
 * @param createdSourceFile reference of created sourcefile that we want to add the interface to it
 */
export function addFunQLInterfaceToSourceFile(
  myInterface: InterfaceDeclaration,
  createdSourceFile: SourceFile,
  options: { type?: "dynamic" | "static" } = { type: "dynamic" }
) {
  //extract options
  const { type } = options;

  //checks interface name is duplicate or not and also is Date or not
  if (
    //ignore date type or similar
    isInternalType(myInterface.getName()) ||
    //when interface was inserted to source file
    myInterface.getName().startsWith("FQl")
  ) {
    return;
  } else {
    //change name of interface first
    changeNameAndItsRefs(myInterface, type);
  }

  //create new interface with new name
  const createdInterface = createdSourceFile.addInterface({
    name: myInterface.getName(),
    isExported: true,
    docs: myInterface.getJsDocs().map((doc) => doc.getStructure()),
  });

  //finds all props that include in body of interface or specified with inheritance
  const foundedProps = findAllPropsOfInterface(myInterface);

  for (const prop of foundedProps) {
    //handle when type of prop is Bson.ObjectId
    //map it to string type
    if (prop.getText().match(/Bson.ObjectI[dD]/)) {
      prop.setType("string");
    }
    //construct deps of interface in prop
    handlePropType(prop, createdSourceFile, { type });
    //add prop to created interface
    createdInterface.addProperty(prop.getStructure());
  }
}
