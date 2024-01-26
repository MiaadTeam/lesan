# deleteOne functions

`Deletion` has the same problems as `update`.  

### Delete a User
Pay attention to the following code:

```ts
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
```

If you remember, when we defined a relationship for the user, we gave it the following object as a relationship:

```ts
{
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
}
```

Fortunately, all the relationships that exist for the user are the ones we have defined above, and there is no `relatedRelation` for the `user`.
![user-schema-for-delete](https://github.com/MiaadTeam/lesan/assets/6236123/233343a0-b384-4651-91e6-fef86eed7ff2)

That's why we said fortunately, because if a document has `relatedRelations`, by `deleting` that document, some `documents` may be meaningless or not used. For example, if we want to delete a `country` in the example we have completed so far, the `cities` belonging to that country will become meaningless data.

There is no problem for `users` and we can simply use `delete` without other data being unused. But by `deleting` each `user`, we have to check its `mainRelations` and if the `user` is stored as an `embed`, `delete` the `user` there, and if another `user` needs to be added to the `embed` list, add the other `user` as well.

In our example, we have to check the `embedded` list of `users` in the `cities` where the user lives, as well as the list of `users` in the `country` belonging to that user.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/09-1-deleteOne.ts) and test the `deleteOne` method in local computer.

bfore execut `main` → `user` → `deleteUser`:  
![15-0-before-execute-delete-user](https://github.com/MiaadTeam/lesan/assets/6236123/681173da-9fc0-4c81-930a-12c63ded6228)

executing `main` → `user` → `deleteUser`:  
![15-1-delete-user-executing](https://github.com/MiaadTeam/lesan/assets/6236123/a6d2e8bd-7340-4e0d-97c8-78bf9ecd7b0e)

after execut `main` → `user` → `deleteUser`:  
![15-2-after-delete-user](https://github.com/MiaadTeam/lesan/assets/6236123/a997cc73-3d63-4bc9-b2d1-e8ee0d4c7e9f)

### Delete a Country
What if we want to remove a `country`?
Although we have not defined any `relationship` for the `country`, both the `city` and the `user` have created `relationships` with the `country`.

```ts
const countryRelations = {};

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

const userRelations = {
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
};
```

![Screen-Shot-1402-10-28-at-10 04 16](https://github.com/MiaadTeam/lesan/assets/6236123/13bfac05-a2ec-43f6-84b6-af5d45fcb244)
As we said earlier, the data created based on this `country` will be useless. Here the `cities` and `users` created based on this `country` become useless.
Pay attention to the following code:

```ts
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
  });
};
coreApp.acts.setAct({
  schema: "country",
  actName: "deleteCountry",
  validator: deleteCountryValidator(),
  fn: deleteCountry,
});
```

By adding the above `code` and running the software and sending a `request` to `delete` a `country`, and finally if that country has a `city` or `user`, we will encounter the following `error`:

```json
{
  body: {
    message: please clear below relations status before deletion:  [ {  schemaName:  country,   type:  single,   optional:  false,   fieldName:  country,   collection:  city,   doc:  {   _id:  65a3d213e18957d8c176ffb4,    name:  Hamedan,    population:  900000,    abb:  HM,    country:  {    _id:  65a3d213e18957d8c176ffb2,     name:  Islamic Republic Of Iran,     population:  89000000,     abb:  IR   },    users:  [    {     _id:  65a3d213e18957d8c176ffc0,      name:  Mohammad Sheida,      age:  20    },     {     _id:  65a3d213e18957d8c176ffbf,      name:  Elham Afshar,      age:  25    },     {     _id:  65a3d213e18957d8c176ffbd,      name:  Saeid Ghal,      age:  27    },     {     _id:  65a3d213e18957d8c176ffbc,      name:  Ehsan Akefi,      age:  20    },     {     _id:  65a3d213e18957d8c176ffbb,      name:  Amir Meyari,      age:  30    }   ]  } },  {  schemaName:  country,   type:  single,   optional:  false,   fieldName:  country,   collection:  user,   doc:  {   _id:  65a3d213e18957d8c176ffb7,    name:  Syd Amir,    age:  36,    livedCities:  [    {     _id:  65a3d213e18957d8c176ffb4,      name:  Hamedan,      population:  900000,      abb:  HM    },     {     _id:  65a3d213e18957d8c176ffb5,      name:  Tehran,      population:  1000000,      abb:  TH    }   ],    country:  {    _id:  65a3d213e18957d8c176ffb2,     name:  Islamic Republic Of Iran,     population:  89000000,     abb:  IR   }  } }]
  },
  success: false
}
```

We have two ways:

- `Delete` all these documents `related` to this `country` one by one.
- Set the `hardCascade` option to `true` in the `deleteOne` function.
  We change the above code as follows:

```ts
return await countries.deleteOne({
  filter: { _id: new ObjectId(_id) },
  hardCascade: true,
});
```

This will cause all the dependent documents and the dependent documents of these dependent documents to be `deleted` recursively.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/09-2-deleteOne.ts) and test the `deleteOne` method in local computer.

bfore execut `main` → `country` → `deleteCountry`:
![delete-country-before](https://github.com/MiaadTeam/lesan/assets/6236123/19cd739a-b5ae-43e3-8991-d190b4b0f500)

executing `main` → `country` → `deleteCountry`:
![deleteing-country](https://github.com/MiaadTeam/lesan/assets/6236123/93080e4d-847a-4968-a587-bb02a36ff360)

after execut `main` → `country` → `deleteCountry`:
![delete-country-after](https://github.com/MiaadTeam/lesan/assets/6236123/f12495a1-11ec-4cc3-9ec3-0924c014cbdd)

### Add E2E Test

Like before, for adding `deleteCountry` request to E2E section you should click on the e2e button (like bottom picture) to add your request to E2E section.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/fae58c10-f792-4041-89ca-186dc89bcee1">

Then, in the E2E section and `deleteCountry` sequence, you should _replace_ the **country id** that you set capture in _own sequence_ with _default_ **country id**. _default_ **country id** in `deleteCountry` sequence is like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/1ed7e065-338a-4bea-9aa9-439b34c45d3d">

The _replaced_ **country id** is like below picture.

<img width="1680" alt="e2e sequence" src="https://github.com/MiaadTeam/lesan/assets/96171913/1c91c3ff-83f3-4136-80d7-c1f97fa11272">
