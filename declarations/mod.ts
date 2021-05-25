import { getSchemaDeclarations } from "./schema/mod.ts";
import { getRequestDeclarations } from "./request/mod.ts";

export const generateDeclarations = async (
  generateSchema: boolean,
  generateRequest: boolean
) => {
  generateRequest && (await getRequestDeclarations());
  generateSchema && (await getSchemaDeclarations());
};
