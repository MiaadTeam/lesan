const content = `
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { cities, City, RCity } from "../../../schemas/city.ts";
import { populateMany } from "../../../utils/index.ts";
import { getCountries } from "../../country/funcs/index.ts";

type GetCitiesInput = { filter: Bson.Document; getObj: RCity };
type GetCitiesFn = ({ filter, getObj }: GetCitiesInput) => Promise<City[]>;

export const getCities: GetCitiesFn = async ({ filter, getObj }) => {
  const foundedCities = await cities.find(filter);
  let returnCities = await foundedCities.toArray();
  if (getObj.country)
    returnCities = await populateMany(
      returnCities,
      getCountries,
      "country",
      getObj.country
    );
  if (getObj.state)
    returnCities = await populateMany(
      await foundedCities.toArray(),
      getCountries,
      "state",
      getObj.state
    );
  return returnCities;
};
`;

export const createGetCitiesContent = async (init: string) => {
  await Deno.writeTextFile(`${init}/getCities.ts`, content);
};
