import { Struct } from "../../npmDeps.ts";

export const generateTypesFromStruct = (
  { schemaStruct, keyname, postFix }: {
    schemaStruct: Struct<any>;
    keyname?: string;
    postFix?: string;
  },
) => {
  let returnStr = "";

  const schemaStructValidate = schemaStruct.validate(undefined)[0];

  if (schemaStructValidate === undefined || schemaStructValidate === null) {
    if (keyname && !keyname.endsWith("?")) {
      keyname = `${keyname}?`;
    }
  }

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
      const keyValue = isNaN(key as any) ? `"${key}"` : Number(key);
      if (currentCount === propertyCount) {
        returnStr = returnStr + `${keyValue} `;
      } else {
        returnStr = returnStr + `${keyValue} | `;
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

  if (schemaStruct.type === "record") {
    returnStr = returnStr +
      `${keyname}: Record<string, any>;\n`;
  }

  if (schemaStruct.type === "tuple") {
    returnStr = returnStr +
      `${keyname}: any[];\n`;
  }

  if (schemaStruct.type === "literal") {
    returnStr = returnStr +
      `${keyname}: "${schemaStruct.schema}"${
        postFix ? (postFix + ";") : ";"
      }\n`;
  }

  return returnStr;
};
