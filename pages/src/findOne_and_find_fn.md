# findOne and find functions
When you want to penetrate only one step in the depth of relationships, the best choices are `find` and `findOne` functions.  
According to Mongo's behavior, only `Aggregation` can be used to send a left join query to receive relationships. But considering that all relationships are automatically embedded in **Lesan**, you can use `find` and `findOne` along with `aggregation` to get one level of relationships, i.e. the father along with all the children.

### findOne functions
#### find a user
lets add `getUser` functions:
```ts
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
```
`findOne` functions accept three inputs:
- `filters` which is mongodb [findOne](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-projection-operators-top) query operation
- `projection` which is mongodb [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/#std-label-findOne-projection) operation
- and optional `option` which is mongodb [findOption](https://mongodb.github.io/node-mongodb-native/4.0//interfaces/findoptions.html)  

You can also read mongodb [`findOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/) section for more information.  
executing  `main` → `user` → `getUser`:
![Screenshot 2024-01-08 at 19-21-17 Lesan Playground](https://github.com/MiaadTeam/lesan/assets/6236123/d010bd29-18a1-4c85-881a-8c4c5745a883)

#### find a city or country
Finding a city or country is exactly the same as finding a user.  
Pay attention to the following code:
```ts
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
```

The only difference here is in the `coreApp.schemas.selectStruct` function. The second input of this function, instead of a number, is an object of the `relationship` key with a value of one number, which explicitly specifies how much this `act` can penetrate in this particular relationship.  
executing  `main` → `city` → `getCity`:
![Screenshot 2024-01-09 at 14-49-33 Lesan Playground](https://github.com/MiaadTeam/lesan/assets/6236123/ce2caf5c-db59-4cc1-bc9d-673296490e2f)

executing  `main` → `country` → `getCountry`:
![Screenshot 2024-01-09 at 15-03-45 Lesan Playground](https://github.com/MiaadTeam/lesan/assets/6236123/78959737-363c-4505-90a8-b4841b7ad548)

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/06-find-one.ts) and test the `findOne` method in local computer.

### find functions
#### find users
lets add `getUsers` functions:
```ts
const getUsersValidator = () => {
  return object({
    set: object({
      countryId: objectIdValidation,
      cityId: objectIdValidation,
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
```
`findOne` functions accept three inputs:
- `filters` which is mongodb [findOne](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-projection-operators-top) query operation
- `projection` which is mongodb [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/#std-label-findOne-projection) operation
- and optional `option` which is mongodb [findOption](https://mongodb.github.io/node-mongodb-native/4.0//interfaces/findoptions.html)  

You can also read mongodb [`findOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/) section for more information.  
executing  `main` → `user` → `getUser`:
![Screenshot 2024-01-08 at 19-21-17 Lesan Playground](https://github.com/MiaadTeam/lesan/assets/6236123/d010bd29-18a1-4c85-881a-8c4c5745a883)

