import {
  SourceFile,
  SyntaxKind,
} from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
import { exObIterator } from "../tsMorph/exObIterator.ts";
import { getImpSourceFile } from "../tsMorph/getImpSourceFile.ts";
import { constructFVDetails } from "./constructFVDetails.ts";

export async function constructFVDoits(
  sourceFile: SourceFile,
  _modelName: string,
) {
  const objectIterator = sourceFile?.getFirstDescendantByKind(
    SyntaxKind.ElementAccessExpression,
  );

  const listOfFns = objectIterator
    ?.getFirstChildIfKind(SyntaxKind.ObjectLiteralExpression)
    ?.getChildSyntaxList();

  const results = [];
  //we should
  for (const fn of exObIterator(listOfFns!)) {
    results.push({
      name: fn.name,
      details: await constructFVDetails(
        getImpSourceFile(sourceFile, fn.functionName!),
      ),
    });
  }

  return results.reduce((pre: any, curr) => {
    pre[curr.name!] = { type: "object", props: curr.details };
    return pre;
  }, {});
}
