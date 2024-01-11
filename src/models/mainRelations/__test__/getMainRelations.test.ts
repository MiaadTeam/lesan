import { getMainRelations } from "../getMainRelations.ts";
import { TSchemas } from "../../mod.ts";
import { number, string } from "../../../npmDeps.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.211.0/assert/mod.ts";

export const schemaMockData: TSchemas = {
  user: {
    pure: {
      _id: string(),
      name: string(),
      age: number(),
      address: string(),
    },
    relations: {
      livedCities: {
        optional: false,
        schemaName: "city",
        type: "multiple",
        sort: {
          field: "_id",
          order: "desc",
        },
        relatedRelations: {
          users: {
            type: "multiple",
            limit: 5,
            sort: {
              field: "_id",
              order: "desc",
            },
          },
        },
      },
      country: {
        optional: false,
        schemaName: "country",
        type: "single",
        relatedRelations: {
          users: {
            type: "multiple",
            limit: 5,
            sort: {
              field: "_id",
              order: "desc",
            },
          },
        },
      },
    },
    mainRelations: {
      cities: {
        schemaName: "city",
        type: "multiple",
        optional: false,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
      country: {
        schemaName: "country",
        type: "single",
        optional: false,
      },
    },
    relatedRelations: {},
  },
  country: {
    pure: {
      _id: string(),
      name: string(),
      abb: number(),
      population: number(),
    },
    relations: {},
    mainRelations: {},
    relatedRelations: {
      cities: {
        mainRelationName: "country",
        mainRelationType: "single",
        schemaName: "city",
        type: "multiple",
        limit: 5,
        sort: {
          field: "_id",
          order: "asc",
        },
      },
      users: {
        mainRelationName: "country",
        mainRelationType: "single",
        schemaName: "user",
        type: "multiple",
        limit: 5,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
    },
  },
  city: {
    pure: {
      _id: string(),
      name: string(),
      abb: number(),
      population: number(),
    },
    relations: {
      country: {
        schemaName: "country",
        type: "single",
        optional: false,
        relatedRelations: {
          cities: {
            type: "multiple",
            limit: 5,
            sort: {
              field: "_id",
              order: "asc",
            },
          },
        },
      },
    },
    mainRelations: {
      country: {
        schemaName: "country",
        type: "single",
        optional: false,
      },
    },
    relatedRelations: {
      users: {
        mainRelationName: "livedCities",
        mainRelationType: "multiple",
        schemaName: "user",
        type: "multiple",
        limit: 5,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
    },
  },
};

Deno.test({
  name: "getMainRelations should return mainRelation from schemaMockData",
  fn() {
    const getSchemaMainRelations = getMainRelations(schemaMockData, "user");
    assertEquals(typeof getSchemaMainRelations, "object");
  },
});

Deno.test({
  name: "getMainRelations should throw err when we want access to notUser",
  fn() {
    const getNotUserMainRelations = () =>
      getMainRelations(schemaMockData, "notUser");
    assertThrows(getNotUserMainRelations, Error, "Invalid schemaName: notUser");
  },
});
