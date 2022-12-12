import { ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { country } from "../../../mod.ts";

export const addCountryFn: ActFn = async (body) => {
  const {
    set: { name, enName, countryCode, geometries },
    get,
  } = body.details;

  const inCountry = await country.insertOne({
    name,
    enName,
    countryCode,
    geometries,
  });

  console.log(inCountry);
  return Object.keys(get).length != 0
    ? await country.findOne({ _id: new ObjectId(inCountry) }, get)
    : { _id: inCountry };
};
