import { addCitySetup } from "./addCity/mod.ts";
import { deleteCitySetup } from "./deleteCity/mod.ts";
import { getCitySetup } from "./getCity/mod.ts";
import { updateCitySetup } from "./updateCity/mod.ts";

export const citySetup = () => {
    addCitySetup();
    updateCitySetup();
    deleteCitySetup();
    getCitySetup();
};
