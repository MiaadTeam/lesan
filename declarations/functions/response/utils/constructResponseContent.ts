import { SourceFile, SyntaxKind } from "./../../../../deps.ts";
import { constructResponseModel } from "./constructResponseModel.ts";
import { getImpSourceFile, exObIterator } from "../../request/utils/mod.ts";

export function constructResponseContent(
  sourceFile: SourceFile,
  createdSourceFile: SourceFile,
  withDetails: boolean = true
) {
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
    res.models = constructResponseModel(
      getImpSourceFile(sourceFile, listOfFn.functionName!),
      res.name,
      createdSourceFile,
      withDetails
    );

    results.push(res);
  }

  return JSON.stringify(
    results.reduce((pre, curr) => {
      pre[curr.name] = { models: curr.models };
      return pre;
    }, {})
  ).replaceAll('"', "");
}
