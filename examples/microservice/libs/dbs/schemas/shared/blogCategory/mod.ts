import {
    array,
    number,
    object,
    optional,
    OutRelation,
    string,
  } from "../../../deps.ts";
  
  export const pureBlogCategory = {
    name: string(),
    enName: string(),
    description: string()
  };

  export const blogCategoryInRel = {};
  
  export const blogCategoryOutRel: Record<string, OutRelation> = {
    blogPosts: {
      schemaName: "blogPost",
      number: 50,
      sort: { type: "objectId", field: "_id", order: "desc" },
    },
  };