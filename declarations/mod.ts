import { getRequestDeclarations } from "./functions/request/mod.ts";
import { CommandArgs } from "../funql.ts";
import { getSchemaDeclarations } from "./schema/mod.ts";
import { getResponseDeclarations } from "./functions/response/mod.ts";

/**
 * @function
 * @async
 * generate schema and request declaration
 * @param commandArgs decision which declaration should construct according to  command args
 */
export const generateDeclarations = async (commandArgs?: CommandArgs) => {
  typeof commandArgs?.declaration === "boolean" &&
  commandArgs?.declaration === true
    ? (await getRequestDeclarations()) && (await getSchemaDeclarations())
    : commandArgs?.declaration === "request"
    ? await getRequestDeclarations()
    : commandArgs?.declaration === "schema"
    ? await getSchemaDeclarations()
    : commandArgs?.declaration === "response"
    ? await getResponseDeclarations()
    : null;
  return;
};
