import { log, SourceFile, SyntaxKind } from "./../../../../deps.ts";
import { constructResponseModel } from "./constructResponseModel.ts";
import { getImpSourceFile, exObIterator } from "../../request/utils/mod.ts";

export function constructResponseContent(
  entryPoint: SourceFile,
  createdSourceFile: SourceFile,
  withDetails: boolean = true
) {
  //find lesan source file
  const sourceFile = getImpSourceFile(entryPoint, "serveLesan");

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
    try {
      const res: any = {};
      res.name = listOfFn.name;
      res.models = constructResponseModel(
        getImpSourceFile(sourceFile, listOfFn.functionName!),
        res.name,
        createdSourceFile,
        withDetails
      );
      results.push(res);
    } catch (error) {
      log.warning("some content type does not implement correctly");
    }
  }

  return JSON.stringify(
    results.reduce((pre, curr) => {
      pre[curr.name] = { models: curr.models };
      return pre;
    }, {})
  ).replaceAll('"', "");
}
