import { generateProjection } from "./generateProjection.ts";
import { Projection, ProjectionPip } from "./type.ts";

const projection: Projection = {
  name: 1,
  family: 1,
  country: {
    name: 1,
    abb: 1,
    states: {
      name: 1,
      abb: 1,
      cities: {
        name: 1,
        abb: 1,
      },
    },
    flag: {
      name: 1,
      desc: 1,
      path: 1,
    },
  },

  ware: {
    name: 1,
    price: 1,
    wareModel: {
      name: 1,
      desc: 1,
      wareType: {
        name: 1,
        desc: 1,
        wareGroup: {
          name: 1,
          desc: 1,
        },
      },
    },
    tags: {
      name: 1,
      desc: 1,
      relatedWare: {
        name: 1,
        price: 1,
      },
    },
  },

  creator: {
    name: 1,
  },
};

const sample: ProjectionPip = [
  {
    "$lookup": {
      "from": "roots",
      "localField": "root",
      "foreignField": "_id",
      "as": "root",
    },
  },
  {
    "$unwind": {
      "path": "$root",
      "preserveNullAndEmptyArrays": true,
    },
  },
  {
    "$lookup": {
      "from": "elixirs",
      "localField": "root.elixir",
      "foreignField": "_id",
      "as": "root.elixir",
    },
  },
  {
    "$unwind": {
      "path": "$root.elixir",
      "preserveNullAndEmptyArrays": true,
    },
  },
  {
    "$lookup": {
      "from": "procedures",
      "localField": "root.elixir.procedures",
      "foreignField": "_id",
      "as": "root.elixir.procedures",
    },
  },
  {
    "$project": {
      "title": 1,
      "description": 1,
      "root": {
        "name": 1,
        "question": 1,
        "elixir": {
          "name": 1,
          "title": 1,
          "description": 1,
          "procedures": {
            "name": 1,
            "description": 1,
            "index": 1,
          },
        },
      },
    },
  },
];

const testProjec = generateProjection(projection);

/*
 *  @LOG @DEBUG @INFO
 *  This log written by ::==> {{ syd }}
 *
 *  Please remove your log after debugging
 */
console.log(" ============= ");
console.log();
console.info({ testProjec: JSON.stringify(testProjec, null, 2) }, " ------ ");
console.log();
console.log(" ============= ");
