import { citySetup } from "./city/mod.ts";
import { countrySetup } from "./country/mod.ts";
import { stateSetup } from "./state/mod.ts";
import { wareSetup } from "./ware/mod.ts";
import { wareTypeSetup } from "./wareType/mod.ts";

export const dynamicSetup = () => {
    // wareSetup();
    // wareTypeSetup();
    countrySetup();
    stateSetup();
    citySetup();
};
