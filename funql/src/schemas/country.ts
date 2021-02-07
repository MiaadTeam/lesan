
import { db } from "../../config/index.ts";
import { RCity, citySelectable } from "./city.ts";
import { RState, stateSelectable } from "./state.ts";
import { City, fieldType, State } from "./index.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";

/*
 when we are just an interface we can have all relations even those are we don't care about it
  or we never populate them in real world but sometime we get queried them on related schema
   so with this way we can resolved many issued on gathering body get field
 
   for example in this interface we never insert states and cities on country schema 
   but in the interface we have it just for whenever get field in body is requested them
*/
export interface Country {
  _id: Bson.ObjectID;
  name: string;
  enName: string;
  states?: State[];
  cities?: City[];
}

export interface RCountry {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  states?: RState;
  cities?: RCity;
}

export const countrySelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    enName: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        states: {
          type: "object",
          optional: true,
          props: stateSelectable(depth),
        },
        cities: {
          type: "object",
          optional: true,
          props: citySelectable(depth),
        },
      }
    : returnObj;
};

export const countries = db.collection<Country>("Countries");
