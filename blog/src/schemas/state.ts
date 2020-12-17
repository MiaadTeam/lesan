const content = `
import { db } from "../../config/index.ts";
import { RCity } from "./city.ts";
import { Country, RCountry } from "./country.ts";
import { citySelectable, countrySelectable, fieldType } from "./index.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";

export interface State {
  _id: Bson.ObjectID;
  name: string;
  enName: string;
  country: Country;
}

export interface RState {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  cities?: RCity;
  country?: RCountry;
}

export const stateSelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    enName: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        cities: {
          type: "object",
          optional: true,
          props: citySelectable(depth),
        },
        country: {
          type: "object",
          optional: true,
          props: countrySelectable(depth),
        },
      }
    : returnObj;
};

export const states = db.collection<State>("States");
`;

export const createStateSchema = async (init: string) => {
  await Deno.writeTextFile(`${init}/state.ts`, content);
};
