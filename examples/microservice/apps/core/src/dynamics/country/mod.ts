import { addCountrySetup } from "./addCountry/mod.ts";

export * from "./addCountry/mod.ts";

export const countrySetup = () => {
    addCountrySetup();
};
