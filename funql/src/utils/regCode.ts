
export const createVerificationCode = (): string => {
  return Deno.env.get("ENVIROMENT") === "production"
    ? Math.floor(Math.random() * (999999 - 100000) + 100000).toString()
    : "111111";
};
