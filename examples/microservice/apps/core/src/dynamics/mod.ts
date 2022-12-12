import { countrySetup } from "./country/mod.ts";
import { userSetup } from "./user/mod.ts";

export const dynamicSetup = () => {
    countrySetup();
    userSetup();
};
