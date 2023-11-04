# Add relation
As we said before, we embed all relationships. So when you define a relation we store the pure fields of both models in each other.  

So far we have defined only one model, let us add the second model.  

We add the following code to the previous codes to add a new model called `city`.
```ts
const cityPure = {
  name: string(),
  population: number(),
  abb: string(),
};

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
    },
  },
};

const cities = coreApp.odm.newModel(
  "city",
  cityPure,
  cityRelations,
);
```

We talked about `newModel` and its input [here](https://miaadteam.github.io/lesan/getting_start.html#add-new-model).  

Now we only talk about the third input, the **relation** definition. which receives an object with string key which is the feild name and we store the relation data by this name inside each document, and `TRelation` value (`relations: Record<string, TRelation>;`) which gave us some `metadata` about the relation. The `TRelation` type is as follows:
```ts
export type RelationDataType = "single" | "multiple";

export type RelationSortOrderType = "asc" | "desc";

export type TRelatedRelation = {
  type: RelationDataType;
  limit?: null | number;
  sort?: {
    field: string;
    order: RelationSortOrderType
  };
};

interface TRelation {
  schemaName: string;
  type: RelationDataType;
  optional: boolean;
  sort?: {
    field: string;
    order: RelationSortOrderType;
  };
  relatedRelations: {
    [key: string]: TRelatedRelation;
  };
}
```

- The `schemaName` key receives the exact name of another `schema` to establish a relation.
- The `type` key specifies whether the relationship type should be `single` or `multiple`.
- The `optional` key specifies whether or not it is mandatory to enter information about this relationship when importing a new document.
- The `sort` key is optional and specifies that if the relationship type is `multiple`, based on which `field` of the relationship schema, the information should be arranged. This key receives an object with two keys:
   - The `field` that receives the name of one of the schema fields in the relation.
   - An `order` that receives the value of `asc` and `desc` and specifies whether the arrangement should be from bottom to top or vice versa.
- `relatedRelations` key that specifies the effects of this schema on the other side of the relationship. This key receives the value of the object with the following keys:
   - The `type` key specifies whether the relationship type should be `single` or `multiple`.
   - `limit` which specifies the number of relations to be kept if the relation `type` is `multiple`.
  - The `sort` key is optional and specifies that if the relationship type is `multiple`, based on which `field` of the relationship schema, the information should be arranged. This key receives an object with two keys:
     - The `field` that receives the name of one of the schema fields in the relation.
     - An `order` that receives the value of `asc` and `desc` and specifies whether the arrangement should be from bottom to top or vice versa.

## Add new `Act` with relation

Let us define an `Act` for this new model. We add the following code for this purpose: 
```ts
  const addCityValidator = () => {
  return object({
    set: object({
      ...cityPure,
      country: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCity: ActFn = async (body) => {
  const { country, name, population, abb } = body.details.set;

  return await cities.insertOne({
    doc: { name, population, abb },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          cities: true,
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

```
> We need to import `objectIdValidation` and  `ObjectId` from `lesan`

We see `Validator` and `Act` and `setAct` and `insertOne` functions before, Here we are only talking about the `relations` input in the insert function. The type of this input is as follow:
```ts
export type TInsertRelations<T extends IRelationsFileds> = {
  [mainKey in keyof T]?: {
    _ids: ObjectId | ObjectId[];
    relatedRelations?: {
      [key in keyof T[mainKey]["relatedRelations"]]: boolean;
    };
  };
};
```

This input receives an object with the key name of the relations that we have previously defined in the model. This object has the following keys:
- `ids` which receives either an `ObjectId` or an array of `ObjectIds`.
- `relatedRelations`, which receives an object with the key of the name of the related relations that we have previously defined in the model along with a `boolean` value. If the value is `true`, in addition to the given relationship being saved in this new document, this created document is also saved in the related relationship. And if it is `false`, the relationship will be saved only in this new document.  

Here, by adding a city and giving the country ID associated with that city, we store both the pure fields of that country in this newly created city, and within that country in an array of objects, we also store the pure fields of this city.

### All codes
Let's see all the code written here and run it.
```ts
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
} from "https://deno.land/x/lesan@vx.x.x/mod.ts"; // Please replace `x.x.x` with the latest version in [releases](https://github.com/MiaadTeam/lesan/releases)

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
    },
  },
};

const cities = coreApp.odm.newModel(
  "city",
  countryCityPure,
  cityRelations,
);

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

const addCityValidator = () => {
  return object({
    set: object({
      ...countryCityPure,
      country: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCity: ActFn = async (body) => {
  const { country, name, population, abb } = body.details.set;

  return await cities.insertOne({
    doc: { name, population, abb },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          cities: true,
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

coreApp.runServer({ port: 1366, typeGeneration: true, playground: true });
```
Now, by running this code and going to playgroun, you should see this page to add the country:
  
![add-country](https://github.com/MiaadTeam/lesan/assets/6236123/4d2bc0d0-8715-44ce-b31c-c6222d1aaed2)

And to add a new city, you should see this page:
  
![add-city](https://github.com/MiaadTeam/lesan/assets/6236123/b59ae7fc-2f11-4326-9944-f5a99d698486)

What exactly happened to the database? If you open MongoDB Compass, the following data should be stored for the country:

![country-data](https://github.com/MiaadTeam/lesan/assets/6236123/9824ded0-ba32-4d4b-a726-838b31bea988)

And the following data should be stored for the city:

![city-data](https://github.com/MiaadTeam/lesan/assets/6236123/eb1a7ea0-fe7e-44e3-96df-08b2d37d4fd9)

As you can see, when you add a city, the pure values are stored as embedded on both sides of the relation. This makes receiving data much faster.  
The only noteworthy point is that a limited number of cities are stored in the country. Try to save as many as you think you will need in the first paginate. To get the rest of the cities, we will also query their own schema.
