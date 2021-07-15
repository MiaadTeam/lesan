import { getRequestDeclarations } from "./request/mod.ts";
import { CommandArgs } from "../funql.ts";
import { getSchemaDeclarations } from "./schema/mod.ts";

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
    : null;
  return;
};
