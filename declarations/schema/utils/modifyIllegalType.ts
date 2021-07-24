import { Node } from "../../../deps.ts";

/**
 * @function
 * modify some type that is used in schema in fun ql that is not supported  in pure typescript file in front end
 * @param node the node that we want to check it
 */
export const modifyIllegalType = (node: Node) => {
  //map it to string type
  if (node.getText().match(/(Bson.)?ObjectI[dD]/)) {
    node.replaceWithText("string");
  }
};
