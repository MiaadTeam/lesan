import {
  ActFn,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  objectIdValidation,
  RelationDataType,
  RelationSortOrderType,
  string,
} from "../../mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("performance");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const pure = {
  name: string(),
  population: number(),
  abb: string(),
};
const countryRelations = {};
const countries = coreApp.odm.newModel(
  "country",
  pure,
  countryRelations,
);

// ------------------ Province Model ------------------
const provinceRelations = {
  country: {
    optional: false,
    schemaName: "country",
    type: "single" as RelationDataType,
    relatedRelations: {
      provinces: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "_id",
          order: "desc" as RelationSortOrderType,
        },
      },
      provincesByPopulation: {
        type: "multiple" as RelationDataType,
        limit: 50,
        sort: {
          field: "population",
          order: "desc" as RelationSortOrderType,
        },
      },
    },
  },
};

const provinces = coreApp.odm.newModel(
  "province",
  pure,
  provinceRelations,
);

// ------------------ City Model ------------------
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
    },
  },
  province: {
    optional: false,
    schemaName: "province",
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
    },
  },
};

const cities = coreApp.odm.newModel(
  "city",
  pure,
  cityRelations,
);

// ================== FUNCTIONS SECTION ==================
// ------------------ Country Founctions ------------------
// ------------------ Add Country ------------------
const addCountryValidator = () => {
  return object({
    set: object(pure),
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

// ------------------ Province Founctions ------------------
// ------------------ Add Propvince ------------------
const addProvinceValidator = () => {
  return object({
    set: object({
      ...pure,
      countryId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("province", 1),
  });
};

const addProvince: ActFn = async (body) => {
  const { name, population, abb, countryId } = body.details.set;
  return await provinces.insertOne({
    doc: {
      name,
      population,
      abb,
    },
    relations: {
      country: {
        _ids: new ObjectId(countryId),
        relatedRelations: {
          provinces: true,
          provincesByPopulation: true,
        },
      },
    },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "province",
  actName: "addProvince",
  validator: addProvinceValidator(),
  fn: addProvince,
});

// ------------------ City Founctions ------------------
// ------------------ Add City ------------------
const addCityValidator = () => {
  return object({
    set: object({
      ...pure,
      countryId: objectIdValidation,
      provinceId: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCity: ActFn = async (body) => {
  const { name, population, abb, countryId, provinceId } = body.details.set;

  return await cities.insertOne({
    doc: {
      name,
      population,
      abb,
    },
    relations: {
      country: {
        _ids: new ObjectId(countryId),
        relatedRelations: {
          cities: true,
          citiesByPopulation: true,
        },
      },
      province: {
        _ids: new ObjectId(provinceId),
        relatedRelations: {
          cities: true,
          citiesByPopulation: true,
        },
      },
    },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "city",
  actName: "addCity",
  validator: addCityValidator(),
  fn: addCity,
});
