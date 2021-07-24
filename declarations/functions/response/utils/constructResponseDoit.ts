import { SourceFile, SyntaxKind, log } from "../../../../deps.ts";
import { bgRgb24 } from "https://deno.land/std@0.96.0/fmt/colors.ts";
import {
  constructFVDetails,
  getImpSourceFile,
  exObIterator,
} from "../../request/utils/mod.ts";
import { constructResponseDetails } from "./constructResponseDetails.ts";

/**
 * @function
 * construct doits from mod.ts files
 * @param sourceFile
 * @param modelName
 */
export function constructResponseDoit(
  sourceFile: SourceFile,
  modelName: string,
  createdSourceFile: SourceFile,
  withDetails: boolean = true
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
      details: constructResponseDetails(
        getImpSourceFile(sourceFile, fn.functionName!),
        fn.functionName!,
        createdSourceFile,
        withDetails
      ),
    });
  }

  //convert array to object
  return JSON.stringify(
    results.reduce((pre: any, curr) => {
      withDetails
        ? (pre[curr.name!] = { details: curr.details })
        : (pre[curr.name!] = curr.details);
      return pre;
    }, {})
  ).replaceAll('"', "");
}
