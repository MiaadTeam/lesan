export const throwError = (msg?: string): never => {
  throw new Error(msg);
};
