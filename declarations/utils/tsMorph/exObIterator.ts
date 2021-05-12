import { Node, SyntaxKind } from "https://deno.land/x/ts_morph@10.0.1/mod.ts";

/**
 * @function
 * find name and fn name from from list of fns
 * list of fns has this schema:
 * ["string literal"]: async ()=> identifer1(args)
 * ["sl2"]: async ()=> identifer2(args)
 * ["sl3"]: async ()=> identifer3(args)
 * @param listOfFns
 */

export const exObIterator = (listOfFns: Node) => {
  return listOfFns
    .getChildrenOfKind(SyntaxKind.PropertyAssignment)!
    .map((fn) => {
      //find name of fn
      const fnNameWithBracket = fn?.getFirstChildByKind(
        SyntaxKind.ComputedPropertyName,
      );
      //get key of object iterator
      const name = fnNameWithBracket
        ?.getFirstChildByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .replaceAll('"', "")
        .replaceAll("'", ""); //remove "" from string literal

      //find fn name
      const functionName = fn
        ?.getFirstDescendantByKind(SyntaxKind.Identifier)
        ?.getText();

      return { name, functionName };
    });
};
