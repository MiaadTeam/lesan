import {
    array,
    number,
    object,
    optional,
    OutRelation,
    string,
  } from "../../../deps.ts";
  
  export const pureBlogTag = {
    name: string()
  };

  export const blogTagInRel = {};

  export const blogTagOutRel: Record<string, OutRelation> = {
    blogPost: {
      schemaName: "blogPost",
      number: 50,
      sort: {type: "objectId", field: "_id", order: "desc" },
    }
  };