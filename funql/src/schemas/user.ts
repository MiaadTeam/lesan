
import { db } from "../../config/index.ts";
import type { City, RCity } from "./city.ts";
import type { RState, State } from "./state.ts";
import type { Country, RCountry } from "./country.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import {
  citySelectable,
  countrySelectable,
  fieldType,
  stateSelectable,
} from "./index.ts";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Level {
  Normal = "Normal",
  Editor = "Editor",
  Admin = "Admin",
  Ghost = "Ghost",
}

export interface User {
  _id: Bson.ObjectID;
  name: string;
  family: string;
  phone: number;
  gender: Gender;
  birthDate: Date;
  postalCode: string;
  address: {
    country: Country;
    state: State;
    city: City;
    text: string;
  };
  level: Level[];
  email?: string;
  password?: string;
  isActive?: boolean;
}

export interface RUser {
  _id: 0 | 1;
  name?: 0 | 1;
  family?: 0 | 1;
  phone?: 0 | 1;
  gender?: 0 | 1;
  birthDate?: 0 | 1;
  postalCode?: 0 | 1;
  address?: {
    country?: RCountry;
    state?: RState;
    city?: RCity;
    text?: 0 | 1;
  };
  level?: 0 | 1;
  email?: 0 | 1;
  password?: 0 | 1;
  isActive?: 0 | 1;
}

export const userSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    family: fieldType,
    phone: fieldType,
    gender: fieldType,
    birthDate: fieldType,
    postalCode: fieldType,
    address: {
      type: "object",
      optional: true,
      props: {
        text: fieldType,
      },
    },
    level: fieldType,
    email: fieldType,
    isActive: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        address: {
          ...returnObj.address,
          props: {
            ...returnObj.address.props,
            country: {
              type: "object",
              optional: true,
              props: countrySelectable(depth),
            },
            state: {
              type: "object",
              optional: true,
              props: stateSelectable(depth),
            },
            city: {
              type: "object",
              optional: true,
              props: citySelectable(depth),
            },
          },
        },
      }
    : returnObj;
};

export const users = db.collection<User>("Users");
