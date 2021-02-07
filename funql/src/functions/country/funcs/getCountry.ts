
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { countries, Country, RCountry } from "../../../schemas/index.ts";
import { throwError } from "../../../utils/index.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCities } from "../../city/funcs/index.ts";
import { getStates } from "../../state/funcs/index.ts";

type GetCountryInput = { _id: Bson.ObjectID; get: RCountry };
type GetCountryFn = ({ _id, get }: GetCountryInput) => Promise<Country>;
export const getCountry: GetCountryFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["states", "cities"]);
  const foundedCountry = await countries.findOne({ _id }, { projection });
  const doRelation = async (country: Country, get: RCountry) => {
    if (get.cities)
      country.cities = await getCities({
        filter: { country: country._id },
        getObj: get.cities,
      });
    if (get.states)
      country.states = await getStates({
        filter: { country: country._id },
        getObj: get.states,
      });
    return country;
  };
  return foundedCountry
    ? await doRelation(foundedCountry, get)
    : throwError("can not find country");
};
