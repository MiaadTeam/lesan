const content = `
export const throwError = (msg?: string) => {
  throw new Error(msg);
};
`;

export const createThrowError = async (init: string) => {
  await Deno.writeTextFile(`${init}/throwErr.ts`, content);
};
