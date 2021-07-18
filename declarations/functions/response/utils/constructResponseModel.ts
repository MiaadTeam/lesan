import { SourceFile, SyntaxKind, bgRgb24, log } from "../../../../deps.ts";
import { exObIterator, getImpSourceFile } from "../../request/utils/mod.ts";
import { constructResponseDoit } from "./constructResponseDoit.ts";

export function constructResponseModel(
  sourceFile: SourceFile,
  contentName: string,
  createdSourceFile: SourceFile,
  withDetails: boolean = true
) {
  log.info(
    bgRgb24(`in construction of models for content: ${contentName}`, 0x380406)
  );

  //get object iterator in mod.ts
  const objectIterator = sourceFile.getFirstDescendantByKindOrThrow(
    SyntaxKind.ElementAccessExpression
  );
  //get object section
  const listOfFns = objectIterator
    .getFirstChildIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
    .getChildSyntaxListOrThrow();
  //using sync perspective instead of async
  //thanks to deno :(
  //deno has problem in dynamic importing 2 or more files simultaneously
  const results = [];
  for (const listOfFn of exObIterator(listOfFns)) {
    const res: any = {};
    res.name = listOfFn.name;
    (res.doits = constructResponseDoit(
      getImpSourceFile(sourceFile, listOfFn.functionName!),
      listOfFn.name!,
      createdSourceFile,
      withDetails
    )),
      results.push(res);
  }
  return JSON.stringify(
    results.reduce((pre, curr) => {
      pre[curr.name] = { doits: curr.doits };
      return pre;
    }, {})
  ).replaceAll('"', "");
}
