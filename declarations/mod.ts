import { getRequestDeclarations } from "./functions/request/mod.ts";
import { CommandArgs } from "../funql.ts";
import { getSchemaDeclarations } from "./schema/mod.ts";
import { getResponseDeclarations } from "./functions/response/mod.ts";
import { log } from "../deps.ts";

/**
 * @function
 * @async
 * generate schema and request declaration
 * @param commandArgs decision which declaration should construct according to  command args
 */
export const generateDeclarations = async (commandArgs?: CommandArgs) => {
  const dirPath = commandArgs?.["dir-path"];
  const outPath = commandArgs?.["out-path"];

  typeof commandArgs?.declaration === "boolean" &&
  commandArgs?.declaration === true
    ? (await getRequestDeclarations(dirPath, outPath)) &&
      (await getSchemaDeclarations(dirPath, outPath)) &&
      (await getResponseDeclarations(dirPath, outPath))
    : commandArgs?.declaration === "request"
    ? await getRequestDeclarations(dirPath, outPath)
    : commandArgs?.declaration === "schema"
    ? await getSchemaDeclarations(dirPath, outPath)
    : commandArgs?.declaration === "response"
    ? await getResponseDeclarations(dirPath, outPath)
    : null;
  return;
};
