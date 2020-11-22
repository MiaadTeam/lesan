import { ensureDir } from "https://deno.land/std@0.78.0/fs/ensure_dir.ts";

export const stateSchemaContent = `
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../db.ts";
import { RCity } from "./City.ts";
import type { Country, RCountry } from "./Country.ts";

export interface State {
  _id: ObjectId;
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

export const states = db.collection<State>("States");
`;

export const createStateSchema = async (init: string) => {
  await ensureDir(`./${init}/schemas`);
  await Deno.writeTextFile(`./${init}/schemas/state.ts`, stateSchemaContent);
};
