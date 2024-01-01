# getSchema

get one feature of schema by schemaName

@param schemaName - name of schema that we want feature

@returns
return one schema feature for example:

### example
```ts
const coreApp = lesan();

const locationPure = {
  name: string(),
  population: number(),
  abb: string(),
};

const cities = coreApp.odm.newModel(
  "city",
  locationPure,
  {
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
);

const getCitySchema = coreApp.schemas.getSchema("city");
```
>> `getCitySchema` is where `getSchema` is used

this function return: 
```ts
 *   pure: {
 *       "_id": string(),
 *       "name": string(),
 *       "location": array(number(), number()),
 *     },
 *
  "relations": {
    "country": {
      "schemaName": "country",
      "type": "single",
      "optional": false,
      "relatedRelations": {
        "cities": {
          "type": "multiple",
          "limit": 5,
          "sort": {
            "field": "_id",
            "order": "asc"
          }
        }
}
}
}
  mainRelations: {
    "country": {
      schemaName: "country",
      "type": "single",
      "optional": false
    }
  },
  "relatedRelations": {
    "users": {
      "mainRelationName": "livedCities",
      "mainRelationType": "multiple",
      "schemaName": "user",
      "type": "multiple",
      "limit": 5,
      "sort": {
        "field": "_id",
        "order": "desc"
      }
    }
}
```
