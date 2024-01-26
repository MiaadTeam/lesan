import {
  ActFn,
  array,
  boolean,
  enums,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  objectIdValidation,
  optional,
  RelationDataType,
  RelationSortOrderType,
  string,
} from "https://deno.land/x/lesan@v0.0.98/mod.ts"; // Please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("dbName"); // change dbName to the appropriate name for your project.

coreApp.odm.setDb(db);

const countryCityPure = {
  name: string(),
  population: number(),
  abb: string(),
};

const countryRelations = {};

const countries = coreApp.odm.newModel(
  "country",
  countryCityPure,
  countryRelations,
);

const cityRelations = {
  country: {
    optional: false,
    schemaName: "country",
    type: "single" as RelationDataType,
    relatedRelations: {
      cities: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
      citiesByPopulation: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "population",
          order: "desc" as RelationSortOrderType,
        },
      },
      capital: {
        type: "single" as RelationDataType,
      },
    },
  },
};

const cities = coreApp.odm.newModel(
  "city",
  countryCityPure,
  cityRelations,
);

const userPure = {
  name: string(),
  age: number(),
};

const users = coreApp.odm.newModel("user", userPure, {
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

  mostLovedCity: {
    optional: true,
    schemaName: "city",
    type: "single",
    relatedRelations: {
      lovedByUser: {
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
});

const addCountryValidator = () => {
  return object({
    set: object(countryCityPure),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const addCountry: ActFn = async (body) => {
  const { name, population, abb } = body.details.set;
  return await countries.insertOne({
    doc: {
      name,
      population,
      abb,
    },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

const getCountryValidator = () => {
  return object({
    set: object({
      countryId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("country", {
      citiesByPopulation: 1,
      users: 1,
      capital: 1,
    }),
  });
};
const getCountry: ActFn = async (body) => {
  const {
    set: { countryId },
    get,
  } = body.details;

  return await countries
    .findOne({
      filters: { _id: new ObjectId(countryId) },
      projection: get,
    });
};
coreApp.acts.setAct({
  schema: "country",
  actName: "getCountry",
  validator: getCountryValidator(),
  fn: getCountry,
});

const getCountriesValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("country", {
      citiesByPopulation: 1,
      users: 1,
      capital: 1,
    }),
  });
};
const getCountries: ActFn = async (body) => {
  let {
    set: { page, limit },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);
  return await countries
    .find({ projection: get, filters: {} })
    .skip(skip)
    .limit(limit)
    .toArray();
};
coreApp.acts.setAct({
  schema: "country",
  actName: "getCountries",
  validator: getCountriesValidator(),
  fn: getCountries,
});

const updateCountryValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      name: optional(string()),
      abb: optional(string()),
      population: optional(number()),
    }),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};
const updateCountry: ActFn = async (body) => {
  const { name, abb, population, _id } = body.details.set;
  const setObj: { name?: string; abb?: string; population?: number } = {};
  name && (setObj.name = name);
  abb && (setObj.abb = abb);
  population && (setObj.population = population);

  return await countries.findOneAndUpdate({
    filter: { _id: new ObjectId(_id) },
    projection: body.details.get,
    update: { $set: setObj },
  });
};
coreApp.acts.setAct({
  schema: "country",
  actName: "updateCountry",
  validator: updateCountryValidator(),
  fn: updateCountry,
});

const deleteCountryValidator = () => {
  return object({
    set: object({
      _id: string(),
    }),
    get: object({
      success: optional(enums([0, 1])),
    }),
  });
};
const deleteCountry: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;
  return await countries.deleteOne({
    filter: { _id: new ObjectId(_id) },
    hardCascade: true,
  });
};
coreApp.acts.setAct({
  schema: "country",
  actName: "deleteCountry",
  validator: deleteCountryValidator(),
  fn: deleteCountry,
});

const addCityValidator = () => {
  return object({
    set: object({
      ...countryCityPure,
      country: objectIdValidation,
      isCapital: boolean(),
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};
const addCity: ActFn = async (body) => {
  const { country, name, population, abb, isCapital } = body.details.set;

  return await cities.insertOne({
    doc: { name, population, abb },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          cities: true,
          citiesByPopulation: true,
          capital: isCapital,
        },
      },
    },
  });
};
coreApp.acts.setAct({
  schema: "city",
  actName: "addCity",
  validator: addCityValidator(),
  fn: addCity,
});

const getCitiesValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("city", { country: 1, lovedByUser: 1 }),
  });
};
const getCities: ActFn = async (body) => {
  let {
    set: { page, limit },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);
  return await cities
    .find({ projection: get, filters: {} })
    .skip(skip)
    .limit(limit)
    .toArray();
};
coreApp.acts.setAct({
  schema: "city",
  actName: "getCities",
  validator: getCitiesValidator(),
  fn: getCities,
});

const getCitiesAggregationValidator = () => {
  return object({
    set: object({
      page: number(),
      take: number(),
      countryId: optional(objectIdValidation),
    }),
    get: coreApp.schemas.selectStruct("city", 3),
  });
};
const getCitiesAggregation: ActFn = async (body) => {
  const {
    set: { page, take, countryId },
    get,
  } = body.details;
  const pipeline = [];

  pipeline.push({ $skip: (page - 1) * take });
  pipeline.push({ $limit: take });
  countryId &&
    pipeline.push({ $match: { "country._id": new ObjectId(countryId) } });

  return await cities
    .aggregation({
      pipeline,
      projection: get,
    })
    .toArray();
};

coreApp.acts.setAct({
  schema: "city",
  actName: "getCitiesAggregation",
  validator: getCitiesAggregationValidator(),
  fn: getCitiesAggregation,
});

const getCityValidator = () => {
  return object({
    set: object({
      cityId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("city", { country: 1, lovedByUser: 1 }),
  });
};
const getCity: ActFn = async (body) => {
  const {
    set: { cityId },
    get,
  } = body.details;

  return await cities
    .findOne({
      filters: { _id: new ObjectId(cityId) },
      projection: get,
    });
};
coreApp.acts.setAct({
  schema: "city",
  actName: "getCity",
  validator: getCityValidator(),
  fn: getCity,
});

const addUserValidator = () => {
  return object({
    set: object({
      ...userPure,
      country: objectIdValidation,
      livedCities: array(objectIdValidation),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUser: ActFn = async (body) => {
  const { country, livedCities, name, age } = body.details.set;
  const obIdLivedCities = livedCities.map(
    (lc: string) => new ObjectId(lc),
  );

  return await users.insertOne({
    doc: { name, age },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          users: true,
        },
      },
      livedCities: {
        _ids: obIdLivedCities,
        relatedRelations: {
          users: true,
        },
      },
    },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

const addUserLivedCityValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      livedCities: array(objectIdValidation),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUserLivedCity: ActFn = async (body) => {
  const { livedCities, _id } = body.details.set;
  const obIdLivedCities = livedCities.map(
    (lc: string) => new ObjectId(lc),
  );

  return await users.addRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      livedCities: {
        _ids: obIdLivedCities,
        relatedRelations: {
          users: true,
        },
      },
    },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "addUserLivedCities",
  validator: addUserLivedCityValidator(),
  fn: addUserLivedCity,
});

const addUserCountryValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      country: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUserCountry: ActFn = async (body) => {
  const { country, _id } = body.details.set;

  return await users.addRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          users: true,
        },
      },
    },
    replace: true,
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "addUserCountry",
  validator: addUserCountryValidator(),
  fn: addUserCountry,
});

const removeLivedCitiesValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      livedCities: array(objectIdValidation),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const removeLivedCities: ActFn = async (body) => {
  const { livedCities, _id } = body.details.set;

  const obIdLivedCities = livedCities.map(
    (lc: string) => new ObjectId(lc),
  );

  return await users.removeRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      livedCities: {
        _ids: obIdLivedCities,
        relatedRelations: {
          users: true,
        },
      },
    },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "removeLivedCities",
  validator: removeLivedCitiesValidator(),
  fn: removeLivedCities,
});

const addMostLovedCityValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      lovedCity: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addMostLovedCity: ActFn = async (body) => {
  const { lovedCity, _id } = body.details.set;

  return await users.addRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      mostLovedCity: {
        _ids: new ObjectId(lovedCity),
        relatedRelations: {
          lovedByUser: true,
        },
      },
    },
    replace: true,
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "addMostLovedCity",
  validator: addMostLovedCityValidator(),
  fn: addMostLovedCity,
});

const removeMostLovedCityValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      lovedCity: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const removeMostLovedCity: ActFn = async (body) => {
  const { lovedCity, _id } = body.details.set;

  return await users.removeRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      mostLovedCity: {
        _ids: new ObjectId(lovedCity),
        relatedRelations: {
          lovedByUser: true,
        },
      },
    },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "removeMostLovedCity",
  validator: removeMostLovedCityValidator(),
  fn: removeMostLovedCity,
});

const getUserValidator = () => {
  return object({
    set: object({
      userId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const getUser: ActFn = async (body) => {
  const {
    set: { userId },
    get,
  } = body.details;

  return await users
    .findOne({
      filters: { _id: new ObjectId(userId) },
      projection: get,
    });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "getUser",
  validator: getUserValidator(),
  fn: getUser,
});

const getUsersValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const getUsers: ActFn = async (body) => {
  let {
    set: { page, limit },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);
  return await users
    .find({ projection: get, filters: {} })
    .skip(skip)
    .limit(limit)
    .toArray();
};
coreApp.acts.setAct({
  schema: "user",
  actName: "getUsers",
  validator: getUsersValidator(),
  fn: getUsers,
});

const getUserAggregationValidator = () => {
  return object({
    set: object({
      userId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 2),
  });
};
const getUserAggregation: ActFn = async (body) => {
  const {
    set: { userId },
    get,
  } = body.details;
  const pipeline = [];

  pipeline.push({ $match: { _id: new ObjectId(userId) } });

  return await users
    .aggregation({
      pipeline,
      projection: get,
    })
    .toArray();
};
coreApp.acts.setAct({
  schema: "user",
  actName: "getUserAggregation",
  validator: getUserAggregationValidator(),
  fn: getUserAggregation,
});

const updateUserValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      name: optional(string()),
      age: optional(number()),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const updateUser: ActFn = async (body) => {
  const { name, age, _id } = body.details.set;
  const setObj: { name?: string; age?: number } = {};
  name && (setObj.name = name);
  age && (setObj.age = age);

  return await users.findOneAndUpdate({
    filter: { _id: new ObjectId(_id) },
    projection: body.details.get,
    update: { $set: setObj },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "updateUser",
  validator: updateUserValidator(),
  fn: updateUser,
});

const deleteUserValidator = () => {
  return object({
    set: object({
      _id: string(),
    }),
    get: object({
      success: optional(enums([0, 1])),
    }),
  });
};
const deleteUser: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;
  return await users.deleteOne({
    filter: { _id: new ObjectId(_id) },
  });
};
coreApp.acts.setAct({
  schema: "user",
  actName: "deleteUser",
  validator: deleteUserValidator(),
  fn: deleteUser,
});

coreApp.runServer({ port: 1366, typeGeneration: true, playground: true });
