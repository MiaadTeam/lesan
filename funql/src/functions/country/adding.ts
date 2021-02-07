
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
  countries,
  Country,
  countrySelectable,
  RCountry,
} from "../../schemas/index.ts";
import { throwError } from "../../utils/index.ts";
import { getCountry } from "./funcs/index.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          enName: { type: "string" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: countrySelectable(2),
      },
    },
  },
});

interface addingCountryDetails {
  set: { name: string; enName: string };
  get: RCountry;
}

type AddingCountry = (
  details: addingCountryDetails
) => Promise<Partial<Country>>;

export const addingCountry: AddingCountry = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, enName },
    get,
  } = details;
  const createdCountry = await countries.insertOne({
    name,
    enName,
  });
  const ob = new Bson.ObjectID(createdCountry);
  return get ? getCountry({ _id: ob, get }) : { _id: ob };
};
