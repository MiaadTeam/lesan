import { SourceFile, log } from "../../../deps.ts";

export async function constructFVDetails(sourceFile: SourceFile) {
  log.info(
    sourceFile.getFilePath().split("functions")[1].replace(".fn.ts", "")
  );
  const typePath = sourceFile.getFilePath().replace(".fn.", ".type.");
  try {
    const imp = await import(`file:///${typePath}`);
    return imp["schema"] ? imp["schema"]["details"]["props"] : {};
  } catch (error) {
    log.error(`error in importing file from specified path
    ${error}
    `);

    return {};
  }
}
