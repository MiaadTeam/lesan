
import { db } from "../../config/index.ts";
import { RState, State, stateSelectable } from "./state.ts";
import { Country, countrySelectable, RCountry } from "./country.ts";
import { fieldType } from "./index.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";

type ObjectId = Bson.ObjectID;

export interface City {
  _id: ObjectId;
  name: string;
  enName: string;
  state: ObjectId | State;
  country: ObjectId | Country;
}

export interface RCity {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  state?: RState;
  country?: RCountry;
}

export const citySelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    enName: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        state: {
          type: "object",
          optional: true,
          props: stateSelectable(depth),
        },
        country: {
          type: "object",
          optional: true,
          props: countrySelectable(depth),
        },
      }
    : returnObj;
};

export const cities = db.collection<City>("Cities");
