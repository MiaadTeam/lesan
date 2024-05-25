import { Struct } from "../npmDeps.ts";

export const generateTypesFromStruct = (
  { schemaStruct, keyname, postFix }: {
    schemaStruct: Struct<any>;
    keyname?: string;
    postFix?: string;
  },
) => {
  let returnStr = "";
  if (schemaStruct.type === "object") {
    returnStr = returnStr + (keyname ? `${keyname}: {\n` : `{\n`);
    for (const key in schemaStruct.schema as Object) {
      returnStr = returnStr +
        generateTypesFromStruct({
          schemaStruct: (schemaStruct.schema as any)[key],
          keyname: key,
        });
    }
    returnStr = returnStr + (postFix ? `}${postFix};\n` : "};\n");
  }
  if (schemaStruct.type === "array") {
    returnStr = returnStr + `${
      generateTypesFromStruct({
        schemaStruct: (schemaStruct.schema as any),
        postFix: "[]",
        keyname,
      })
    }`;
  }

  if (schemaStruct.type === "enums") {
    returnStr = returnStr + (keyname ? `${keyname}: (` : " (");

    const propertyCount = Object.keys(schemaStruct.schema as Object).length;
    let currentCount = 0;
    for (const key in schemaStruct.schema as Object) {
      currentCount++;
      if (currentCount === propertyCount) {
        returnStr = returnStr + `"${key}" `;
      } else {
        returnStr = returnStr + `"${key}" | `;
      }
    }
    returnStr = returnStr +
      `)${postFix ? (postFix + ";") : ";"}\n`;
  }

  if (schemaStruct.type === "string" || schemaStruct.type === "union") {
    returnStr = returnStr +
      `${keyname}: string${postFix ? (postFix + ";") : ";"}\n`;
  }

  if (schemaStruct.type === "number") {
    returnStr = returnStr +
      `${keyname}: number${postFix ? (postFix + ";") : ";"}\n`;
  }

  if (schemaStruct.type === "date") {
    returnStr = returnStr +
      `${keyname}: Date${postFix ? (postFix + ";") : ";"}\n`;
  }

  if (schemaStruct.type === "boolean") {
    returnStr = returnStr +
      `${keyname}: boolean${postFix ? (postFix + ";") : ";"}\n`;
  }

  return returnStr;
};
