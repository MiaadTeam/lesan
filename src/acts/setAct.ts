import { ActInp, Services } from "./types.ts";

/**
 * set Actions to main service
 * @param {ActInp} actInp - actInp is equal to{
 * type: type of Actions static or dynamic,
 * schema: schema name of action  for example city
 * actName: name of action  for example createCity,
 * validator: validator function,
 * fn: function of createUser
 * }
 */

export const setAct = (
  acts: Services,
  { type, schema, actName, validator, fn }: ActInp,
) => {
  if (!acts.main[type]) {
    throw new Error(`Invalid type: ${type}`);
  }

  if (!acts.main[type][schema]) {
    acts.main[type][schema] = {};
  }
  acts.main[type][schema][actName] = {
    validator,
    fn,
  };
};
