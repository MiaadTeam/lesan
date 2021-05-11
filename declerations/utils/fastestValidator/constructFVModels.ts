import {
  SourceFile,
  SyntaxKind,
} from "https://deno.land/x/ts_morph@10.0.1/mod.ts";
import { exObIterator } from "../tsMorph/exObIterator.ts";
import { getImpSourceFile } from "../tsMorph/getImpSourceFile.ts";
import { constructFVDoits } from "./constructFVDoits.ts";

export async function constructFVModels(sourceFile: SourceFile) {
  //get object iterator in mod.ts
  const objectIterator = sourceFile.getFirstDescendantByKindOrThrow(
    SyntaxKind.ElementAccessExpression,
  );
  //get object section
  const listOfFns = objectIterator
    .getFirstChildIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
    .getChildSyntaxListOrThrow();
  //using sync perspective instead of async
  //thanks to deno :(
  const results = [];
  for (const listOfFn of exObIterator(listOfFns)) {
    const res: any = {};
    res.name = listOfFn.name;
    (res.doits = await constructFVDoits(
      getImpSourceFile(sourceFile, listOfFn.functionName!),
      listOfFn.functionName!,
    )), results.push(res);
  }
  return results.reduce(
    (pre: any, curr) => {
      pre["props"]["doits"]["props"][curr.name!] = {
        type: "object",
        props: curr.doits,
      };
      return pre;
    },
    { type: "object", props: { doits: { type: "object", props: {} } } },
  );
}
