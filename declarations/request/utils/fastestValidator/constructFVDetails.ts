import { SourceFile, log } from "../../../../deps.ts";

export async function constructFVDetails(sourceFile: SourceFile) {
  log.info(
    `in construction of details: ${sourceFile
      .getFilePath()
      .split("functions")[1]
      .replace(".fn.ts", "")}`
  );
  const typePath = sourceFile.getFilePath().replace(".fn.", ".type.");
  try {
    const imp = await import(`file:///${typePath}`);

    return imp["schema"]["details"]["props"];
  } catch (error) {
    log.warning(`can not find schema variable or details object in the imported file, assume this is any
    ${error}`);

    return {};
  }
}
