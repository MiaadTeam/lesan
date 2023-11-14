import {
  ActFn,
  array,
  boolean,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  objectIdValidation,
  optional,
  size,
  string,
} from "../../mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("sample");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const locationPure = {
  name: string(),
  population: number(),
  abb: string(),
};
const countryRelations = {};
const countries = coreApp.odm.newModel(
  "country",
  locationPure,
  countryRelations,
);

// ------------------ City Model ------------------

const cities = coreApp.odm.newModel(
  "city",
  locationPure,
  {
    country: {
      schemaName: "country",
      type: "single",
      optional: false,
      relatedRelations: {
        citiesAsc: {
          type: "multiple",
          limit: 5,
          sort: {
            field: "_id",
            order: "asc",
          },
        },
        citiesDesc: {
          type: "multiple",
          limit: 5,
          sort: {
            field: "_id",
            order: "desc",
          },
        },
        citiesByPopAsc: {
          type: "multiple",
          limit: 5,
          sort: {
            field: "population",
            order: "asc",
          },
        },
        citiesByPopDesc: {
          type: "multiple",
          limit: 5,
          sort: {
            field: "population",
            order: "desc",
          },
        },
        capitalCity: {
          type: "single",
        },
      },
    },
  },
);
// ------------------ User Model ------------------
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

// ================== FUNCTIONS SECTION ==================
// ------------------ Country Founctions ------------------
// ------------------ Add Country ------------------
const addCountryValidator = () => {
  return object({
    set: object(locationPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
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

// ------------------ Add Multiple Countries ------------------
const addMultipleCountriesValidator = () => {
  return object({
    set: (object({ multiCountries: array(object()) })),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
  });
};

const addCountries: ActFn = async (body) => {
  const { multiCountries } = body.details.set;
  return await countries.insertMany({
    docs: multiCountries,
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "addCountries",
  validator: addMultipleCountriesValidator(),
  fn: addCountries,
});

// ------------------ Get Countries  ------------------
const getCountriesValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("country", 1),
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

// ------------------ Delete Country ------------------
const deleteCountryValidator = () => {
  return object({
    set: object({
      _id: string(),
    }),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const deleteCountry: ActFn = async (body) => {
  const {
    set: { _id },
    get,
  } = body.details;
  return await countries
    .deleteOne({ filter: { _id: new ObjectId(_id) }, hardCascade: true });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "deleteCountry",
  validator: deleteCountryValidator(),
  fn: deleteCountry,
});

// ------------------ City Founctions ------------------
// ------------------ Add City ------------------
const addCityValidator = () => {
  return object({
    set: object({
      ...locationPure,
      isCapital: optional(boolean()),
      country: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCity: ActFn = async (body) => {
  const { country, isCapital, name, population, abb } = body.details.set;

  return await cities.insertOne({
    doc: { name, population, abb },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          citiesAsc: true,
          citiesDesc: true,
          citiesByPopAsc: true,
          citiesByPopDesc: true,
          capitalCity: isCapital,
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

// ------------------ Add Multiple Cities ------------------
const addCitiesValidator = () => {
  return object({
    set: object({
      multiCities: array(object()),
      country: string(),
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCities: ActFn = async (body) => {
  const { country, multiCities } = body.details.set;

  return await cities.insertMany({
    docs: multiCities,
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          citiesAsc: true,
          citiesDesc: true,
          citiesByPopAsc: true,
          citiesByPopDesc: true,
          capitalCity: false,
        },
      },
    },
  });
};

coreApp.acts.setAct({
  schema: "city",
  actName: "addCities",
  validator: addCitiesValidator(),
  fn: addCities,
});

// ------------------ Get City ------------------
const getCitiesValidator = () => {
  return object({
    set: object({
      page: number(),
      take: number(),
      countryId: optional(size(string(), 24)),
    }),
    get: coreApp.schemas.selectStruct("city", 5),
  });
};
const getCities: ActFn = async (body) => {
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
  actName: "getCities",
  validator: getCitiesValidator(),
  fn: getCities,
});

// ------------------ User Founctions ------------------
// --------------------- Add User ----------------------
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
    (lp: string) => new ObjectId(lp),
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

// --------------------- Add User Relation ----------------------
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
    _id: new ObjectId(_id),
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
// --------------------- Add User Relation ----------------------
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
    _id: new ObjectId(_id),
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
// ================== RUNNING SECTION ==================
// --------------------- Run Server ----------------------
coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
