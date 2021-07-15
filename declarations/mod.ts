import {
  getDynamicSchemaDeclarations,
  getStaticSchemaDeclarations,
} from "./schema/mod.ts";
import { getRequestDeclarations } from "./request/mod.ts";
import { CommandArgs } from "../funql.ts";

export const generateDeclarations = async (commandArgs?: CommandArgs) => {
  const extraCommandArgs = commandArgs?._;

  const generateRequest =
    commandArgs?.declaration === "request" ||
    typeof commandArgs?.declaration === "boolean";
  const generateSchema =
    commandArgs?.declaration === "schema" ||
    typeof commandArgs?.declaration === "boolean";

  generateRequest && (await getRequestDeclarations());
  generateSchema &&
    (extraCommandArgs?.includes("dynamic")
      ? await getDynamicSchemaDeclarations()
      : extraCommandArgs?.includes("static")
      ? await getStaticSchemaDeclarations()
      : (await getDynamicSchemaDeclarations()) &&
        (await getStaticSchemaDeclarations()));
};
