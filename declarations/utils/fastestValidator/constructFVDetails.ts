import { SourceFile } from "https://deno.land/x/ts_morph@10.0.1/mod.ts";

export async function constructFVDetails(sourceFile: SourceFile) {
  const typePath = sourceFile.getFilePath().replace(".fn.", ".type.");
  try {
    console.log(typePath);
    const imp = await import(`file:///${typePath}`);
    return imp["schema"] ? imp["schema"]["details"]["props"] : {};
  } catch (_error) {
    console.log("                      ");
    console.log("++++++++++++++++++++++");
    console.log("                      ");
    console.group("error => : ");
    console.log("                      ");
    console.log(_error);
    console.log("                      ");
    console.groupEnd();
    console.log("                      ");
    console.log("----------------------");
    console.log("                      ");

    return {};
  }
}
