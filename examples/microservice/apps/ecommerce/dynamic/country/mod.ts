import { addCountrySetup } from "./addCountry/mod.ts";
import { deleteCountrySetup } from "./deleteCountry/mod.ts";
import { getCountrySetup } from "./getCountry/mod.ts";
import { updateCountrySetup } from "./updateCountry/mod.ts";

export * from "./addCountry/mod.ts";

export const countrySetup = () => {
    addCountrySetup();
    deleteCountrySetup();
    getCountrySetup();
    updateCountrySetup();
};
