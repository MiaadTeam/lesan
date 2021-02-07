
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { countries, Country, RCountry } from "../../../schemas/index.ts";
import { populateMany } from "../../../utils/index.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCities } from "../../city/funcs/index.ts";
import { getStates } from "../../state/funcs/index.ts";

type GetCountriesInput = { filter: Bson.Document; getObj: RCountry };
type GetCountriesFn = ({
  filter,
  getObj,
}: GetCountriesInput) => Promise<Country[]>;
export const getCountries: GetCountriesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["states", "cities"]);
  const foundedCountries = await countries.find(filter, { projection });
  let returnCountries = await foundedCountries.toArray();
  if (getObj.states)
    returnCountries = await populateMany(
      returnCountries,
      getStates,
      "states",
      getObj.states
    );
  if (getObj.cities)
    returnCountries = await populateMany(
      returnCountries,
      getCities,
      "cities",
      getObj.cities
    );
  return returnCountries;
};
