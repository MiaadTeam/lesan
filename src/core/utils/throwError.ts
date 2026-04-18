/**
 * get message and throw error
 * @param msg - message of error
 * @returns throwError with input message
 */
export const throwError = (msg?: string): never => {
  throw new Error(msg);
};
