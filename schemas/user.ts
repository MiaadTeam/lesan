import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";

export const userSchemaContent = `
import db from "../db.ts";
import type { City, RCity } from "./City.ts";
import type { RState, State } from "./State.ts";
import type { Country, RCountry } from "./Country.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";

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
  _id: ObjectId;
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

export const users = db.collection<User>("Users");
`;

export const createUserSchema = async (init: string) => {
  await ensureDir(`./${init}/schemas`);
  await Deno.writeTextFile(`./${init}/schemas/user.ts`, userSchemaContent);
};
