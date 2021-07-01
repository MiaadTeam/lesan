import { exObIterator } from "../tsMorph/exObIterator.ts";
import { getImpSourceFile } from "../tsMorph/getImpSourceFile.ts";
import { constructFVDetails } from "./constructFVDetails.ts";
import { SourceFile, SyntaxKind, log } from "../../../../deps.ts";
import { bgRgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";

/**
 * @function
 * construct doits from mod.ts files
 * @param sourceFile
 * @param modelName
 */
export async function constructFVDoits(
  sourceFile: SourceFile,
  modelName: string
) {
  log.info(
    bgRgb24(`in construction of doits for model: ${modelName}`, 0x010217)
  );
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
