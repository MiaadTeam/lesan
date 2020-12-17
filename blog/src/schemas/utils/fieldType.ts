const content = `
export const fieldType = { type: "enum", values: [0, 1], optional: true };
`;

export const createFieldTypeContent = async (init: string) => {
  await Deno.writeTextFile(`${init}/fieldType.ts`, content);
};
