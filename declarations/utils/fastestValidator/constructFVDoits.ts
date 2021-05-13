import { SourceFile, SyntaxKind } from "../../deps.ts";
import { exObIterator } from "../tsMorph/exObIterator.ts";
import { getImpSourceFile } from "../tsMorph/getImpSourceFile.ts";
import { constructFVDetails } from "./constructFVDetails.ts";

/**
 * @function
 * construct doits from mod.ts files
 * @param sourceFile
 * @param _modelName
 */
export async function constructFVDoits(
  sourceFile: SourceFile,
  _modelName: string
) {
  const objectIterator = sourceFile?.getFirstDescendantByKind(
    SyntaxKind.ElementAccessExpression
  );

  const listOfFns = objectIterator
    ?.getFirstChildIfKind(SyntaxKind.ObjectLiteralExpression)
    ?.getChildSyntaxList();

  const results = [];

  //using sync perspective instead of async
  //thanks to deno :(
  //deno has problem in dynamic importing 2 or more files simultaneously
  for (const fn of exObIterator(listOfFns!)) {
    results.push({
      name: fn.name,
      details: await constructFVDetails(
        getImpSourceFile(sourceFile, fn.functionName!)
      ),
    });
  }

  //convert array to object
  return results.reduce((pre: any, curr) => {
    pre[curr.name!] = {
      type: "object",
      props: { details: { type: "object", props: curr.details } },
    };
    return pre;
  }, {});
}
