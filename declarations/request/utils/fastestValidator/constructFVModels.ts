import { SourceFile, SyntaxKind } from "../../../../deps.ts";
import { exObIterator } from "../tsMorph/exObIterator.ts";
import { getImpSourceFile } from "../tsMorph/getImpSourceFile.ts";
import { constructFVDoits } from "./constructFVDoits.ts";

export async function constructFVModels(sourceFile: SourceFile) {
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
    (res.doits = await constructFVDoits(
      getImpSourceFile(sourceFile, listOfFn.functionName!),
      listOfFn.name!
    )),
      results.push(res);
  }
  return results.reduce((pre, curr) => {
    pre[curr.name] = {
      type: "object",
      props: { doits: { type: "object", props: curr.doits } },
    };
    return pre;
  }, {});
}
