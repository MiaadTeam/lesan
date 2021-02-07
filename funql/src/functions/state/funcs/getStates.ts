
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import { RState, State, states } from "../../../schemas/index.ts";
import { populateMany } from "../../../index.ts";
import { getCountries } from "../../country/funcs/index.ts";

type GetStatesInput = { filter: Bson.Document; getObj: RState };
type GetStatesFn = ({ filter, getObj }: GetStatesInput) => Promise<State[]>;

export const getStates: GetStatesFn = async ({ filter, getObj }) => {
  const foundedStates = await states.find(filter);
  let returnStates = await foundedStates.toArray();
  if (getObj.country)
    returnStates = await populateMany(
      returnStates,
      getCountries,
      "country",
      getObj.country
    );
  return returnStates;
};
