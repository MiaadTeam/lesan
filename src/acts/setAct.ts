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
  { schema, actName, preValidation, validator, fn, preAct, validationRunType }:
    ActInp,
) => {
  if (!acts.main[schema]) {
    acts.main[schema] = {};
  }
  acts.main[schema][actName] = {
    validator,
    fn,
    preAct,
    preValidation,
    validationRunType: validationRunType || "assert",
  };
};
