
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Country } from "../../schemas/country.ts";
import { throwError } from "../../utils/throwErr.ts";
import { addingCountry } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["adding"],
  },
});

export type CountryDoit = "adding";

type CountryFns = (
  doit: CountryDoit,
  details: any
) => Promise<Partial<Country>>;

export const countryFns: CountryFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["adding"]: async () => await addingCountry(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
