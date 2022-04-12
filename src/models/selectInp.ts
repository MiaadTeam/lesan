
import { number, object } from "https://deno.land/x/lestruct@v0.0.2/mod.ts";
import { getSchema, SchemasKey } from "./mod.ts";


export type Type = Record<string, number | any>;


const selectInp=(schema:SchemasKey)=>{
  const foundedSchema = getSchema(schema);
  let returnObj : Type =  {};

  for (const property in foundedSchema.inrelation) {
    returnObj=object({
      ...returnObj,
      [property]: selectInp(foundedSchema.inrelation[property].schemaName)|| number
    })
  }
  for (const property in foundedSchema.outrelation) {
    returnObj=object({
      ...returnObj,
      [property]: selectInp(foundedSchema.outrelation[property].schemaName)|| number
    })
  }


  return returnObj 
}

