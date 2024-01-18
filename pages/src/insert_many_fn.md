# insertMany functions
Another surprise of **Lesan** is the use of `insertMany` while all `relationships` can be `embedded` correctly.
Consider the following example:
```ts
const addCitiesValidator = () => {
  return object({
    set: object({
      multiCities: array(object(countryCityPure)),
      country: objectIdValidation,
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
          cities: true,
          citiesByPopulation: true,
          capital: false,
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
```

There are `two` important points in the above `code`:
- The `multiCities` input is an `array` of `pure` `city` field `objects`. Therefore, it must have the following value:
    ```json
    "multiCities": [
      {
        "name": "Beirout",
        "abb": "BI",
        "population": 20000000
      },
      {
        "name": "Baalbak",
        "abb": "BA",
        "population": 850000
      }
    ]
    ```
    The beautiful thing here is that before the `addCities` function is executed, all data, including `multiCities`, is `validated`. This feature allows us to `validate` the `wrong` data `before` sending any `command` to the `database`.

- The second point is that we explicitly set the `capital` relation in the city `relatedRelation` to `false`. Because we do not know which `city` is going to be chosen as the `capital`. In general, `one-to-one` relations in `insertMany` should always be `false` because they destroy the concept of `insertMany` and cause its `relatedRelations` to be updated `once` for every new document that is added, which is usually wrong.  
 
Pay attention that all `changes` are sent to the `database` with an `aggregation` pipeline.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/10-1-insertMany.ts) and test the `insertMany` method in local computer.  

bfore execut  `main` → `city` → `addCities`:
![insertMany-before-execut-City](https://github.com/MiaadTeam/lesan/assets/6236123/5daa195c-ee97-43f6-8aa5-908d78f72564)

executing  `main` → `city` → `addCities`:
![insertMany-executing-City](https://github.com/MiaadTeam/lesan/assets/6236123/feb44828-7481-4c36-99b6-9559f7bbde07)

after execut  `main` → `city` → `addCities`:
![insertMany-after-execut-City](https://github.com/MiaadTeam/lesan/assets/6236123/752d3cba-92b7-431d-b6ef-99ea001cf033)

Let us use `insertMany` to add `users`:
```ts
const addUsersValidator = () => {
  return object({
    set: object({
      multiUsers: array(object()),
      country: objectIdValidation,
      livedCities: array(objectIdValidation),
      lovedCity: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUsers: ActFn = async (body) => {
  const { country, multiUsers, livedCities, lovedCity } = body.details.set;
  const obIdLivedCities = livedCities.map((lp: string) => new ObjectId(lp));

  return await users.insertMany({
    docs: multiUsers,
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
  actName: "addUsers",
  validator: addUsersValidator(),
  fn: addUsers,
});
```
In the code above, there are almost all types of `relationships` that we can use in `insertMany`.  
- There is a `one-to-many` relationship between `users` and `countries`, that is, the `country` field receives an `ID`, and after finding the relevant `country`, its `pure` fields are stored in the `user`. On the `country` side, in two multiple lists, the user is stored once with ID sorted from last to first(`users` field) and once with age sorted from oldest to youngest(`usersByAge`).  

- Also, `users` have a `many-to-many` relationship with the `cities` they have lived in and receive a set of city `IDs`, and after finding those `cities`, the `pure` fields of each one are stored in an array called `livedCities`.On the `city` side, the `pure` fields of the entered `users` are stored in the `users` field for each `city`.

- The `user` has another `relationship` with the `city`, which is a `one-to-many` relationship. In this way, the `user` saves the `city` he likes the most in the` mostLovedCity` field. And on the `city` side, the list of entered `users` is stored in the field of `lovedByUser`.

bfore execut  `main` → `user` → `addUsers`:
![insertMany-user-before](https://github.com/MiaadTeam/lesan/assets/6236123/f8d7275a-5bf0-4cc4-b869-5e198379d209)

executing  `main` → `user` → `addUsers`:
![insertMany-user-executing](https://github.com/MiaadTeam/lesan/assets/6236123/65d126d9-576b-4489-82f9-c5225aed60dc)

after execut  `main` → `user` → `addUsers`:  
![insertMany-user-after](https://github.com/MiaadTeam/lesan/assets/6236123/5430fe0e-b69a-40fc-9b8b-fc0de4a9eb22)

Pay attention that all `changes` are sent to the `database` with an `aggregation` pipeline.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/10-2-insertMany.ts) and test the `insertMany` method in local computer.  

The implementation of `insertMany` for the `country` is also very simple because no `relationship` is needed to create the `countries`, we will leave the implementation of this part of the code to you.  
If you want to see a real `insertMany` code, you can see the code implemented for the benchmark [here](https://raw.githubusercontent.com/MiaadTeam/benchmark/master/src/lesan-deno-mongo/mod.ts).  
The interesting thing is that due to the correct definition of the `relationship` in **Lesan**, the implementation of the benchmark code with `insertMany` was very simple, while this task was a bit complicated in the rest of the platforms.  
Also, the `time` spent for entering data in **Lesan** is interesting, because this time is very short due to `insertMany`.
