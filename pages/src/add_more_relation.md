# Add more relation

So far we have created two models and one relationship. Let us create another relationship for these two models.  
Just add this object to relatedRelations of city:

```ts
citiesByPopulation: {
  type: "multiple" as RelationDataType,
  limit: 50,
  sort: {
    field: "population",
    order: "desc" as RelationSortOrderType,
  },
}
```

With this relationship, we plan to store the 50 most populated cities of each country in an embedded form.  
Now the `cityRelations` object should look like this:

```ts
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
};
```

And we also need to change the function we wrote to add cities:

```ts
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
          citiesByPopulation: true,
        },
      },
    },
  });
};
```

We just add this line of code:

```ts
  citiesByPopulation: true,
```

Let us add other relationships before testing this code.

### Add arbitrary relation

Let's choose a city as the capital for the countries. For this purpose we must have a single relatedRelation for each country selectively. So we add this code:

```ts
capital: {
  type: "single" as RelationDataType,
},
```

And we change the function and validation we wrote to add the city as follows:

```ts
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
```

We just add `isCapital: boolean(),` to `addCityValidator` and add `capital: isCapital` to the `insertOne` functions.

### Run the code

All the code we have written so far is as follows (You can also see and download this code from [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/04-add-more-relation-1.ts)):

```ts
import {
  ActFn,
  boolean,
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
  countryRelations
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

const cities = coreApp.odm.newModel("city", countryCityPure, cityRelations);

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

coreApp.runServer({ port: 1366, typeGeneration: true, playground: true });
```

If you run the code and go to the playground, you will see that a new input called `isCapital` has been added to add the city,
![capital-field](https://github.com/MiaadTeam/lesan/assets/6236123/279636c5-b7cf-498e-831d-a59853e7156d)

and if we put the value `true` in it, this city will be added to the country as the new capital.

In addition, we have a field called `citiesByPopulation` in the country, where the 50 most populated cities of the country are stored.
![population-city](https://github.com/MiaadTeam/lesan/assets/6236123/743ae12b-e967-49d6-a8df-ffce2ed82e09)

Please note that you only send a request for a new city, and the new city is stored in three different fields with different conditions in the schema of the corresponding country.

### Add E2E Test

In following to adding requests to the E2E test section, like before, you can click on the e2e button (like bottom picture) to add your request to E2E section.

<img alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/fae58c10-f792-4041-89ca-186dc89bcee1">

Like before, you should change the country id of the last request. In the last sequence (add city), you should delete the country id :

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/ab3d275f-a041-4f31-abe9-8e9be9ee8d7c">

And put the variable name that you set in the capture in add country sequence , in my example, « {IranId} ».

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/f51b483a-e160-4bbb-8713-04be8ae77c4b">

## Add many-to-many relationship

Let us add a new model named `user` for this purpose. We add the following code for the `user` model:

```ts
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
        limit: 50,
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
        limit: 50,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
    },
  },
});
```

Well, in the code above, we have created a new model called `user`, which has two pure fields with `name` and `age` keys. In addition, it has a relationship with the `country` and the `city`. Its relationship with the country is `single` and there is a `relatedRelation` with the country with a field called `users`. But its relationship with the city is `multiple` by the `livedCities` key, and there is also a `relatedRelation` with the city with a field called `users`, which is also `multiple`. Therefore, the relationship between the city and the user is `many-to-many`.  
The function we want to add a user is as follows:

```ts
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
  const obIdLivedCities = livedCities.map((lc: string) => new ObjectId(lc));

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
```

> We need to import `array` function from `lesan`

The only thing worth mentioning in the code above is the `livedCities` input in validation, which receives an array of IDs as a string. In the `Act` function, we convert this input into an array of object IDs with a map. Note that the `_ids` key in the `livedCities` object receives an array of object IDs.

Well, let's see the complete code again, run the software and check the outputs.

### All codes

You can see and download this code from [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/04-add-more-relation-2.ts)

```ts
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
  countryRelations
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

const cities = coreApp.odm.newModel("city", countryCityPure, cityRelations);

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
  const obIdLivedCities = livedCities.map((lc: string) => new ObjectId(lc));

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

coreApp.runServer({ port: 1366, typeGeneration: true, playground: true });
```

Open Playground in the browser and go to addUser function.  
![add-user](https://github.com/MiaadTeam/lesan/assets/6236123/4717c9a0-808f-47ad-8e95-2b16f6419305)

Note that the `livedCities` field receives an array of IDs, you just need to enter an input like `["65466c407123faa9c1f3c180", "65466c2c7123faa9c1f3c17e"]`. playground parses it and converts it into an array suitable for sending.

### Add E2E Test

Probably you know what to do! like before, you should change the country id and this time, change the city id. Of course that first you should add capture to lived cities.

In my example, i add the Hamedan city and Tehran city to my user. so , in the add city sequence of Hamedan, i click on the Add Capture button and fill the inputs like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/8aaae323-fd5a-4797-a956-5d219939403d">

And in the add city sequence of Tehran, i click on the Add Capture button and fill the inputs like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/542a8f3a-0d70-461e-8ed3-da474cc1d30e">

Then, in the add user sequence, you can see the curent country id and also lived cities id like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/6186fbdf-792d-4787-bb14-c99513f87069">

Only thing you do is just to replace the country id and lived cities id with country id and cities id that you set in the sequences capture. in my example, country id is « {IranId} » and also my first city id is « {HamedanId} » and second one is «{TehranId}». like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/9582fd44-e8b1-4186-9335-b720be24190e">
