import { addWareSetup } from "./addWare/mod.ts";

export * from "./addWare/mod.ts";

export const wareSetup = () => {
  addWareSetup();
};
