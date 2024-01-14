# `findOneAndUpdate` functions
Updating is the most challenging issue in **Lesan**. Because by updating one document, thousands or maybe millions of other documents may also be updated. Don't worry, this is done automatically by **Lesan**. And also for complex scenarios where millions of documents need to be updated, we have created various solutions.

Let's explore a few scenarios.  

- Best case "Update `a user`":
```ts
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
```
When we were defining `user` relationships, we said that each user has a relationship with the `cities` he lived in. In defining this relationship, we said that we store the last `50 users` who lived in these `cities` in the city table. So it is possible that the `user` who is updated may be in the list of these 50 users in `several cities`. So we have to `find` the cities where this user lives and` update` the list of `users` in those `cities`.  
If we set the `order` of saving this list of 50 items based on a `field` from the `user` and the `same field` has been `updated`, the story will be a little more complicated. Because it is possible that if this `user` is in the list of `50`, he will be `removed` from this list due to the updating of this `field` and another `user` who has suitable conditions will replace this `user`. For more information please read [here](./what_is_the_relationship.md).

All things will be the same for the `country`.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/08-1-findOneAndUpdate.ts) and test the `findOneAndUpdate` method in local computer.

before executing  `main` → `user` → `updateUser`:
![db-user-update](https://github.com/MiaadTeam/lesan/assets/6236123/90f80569-4e19-4274-ba26-2d5c517698b5)

executing  `main` → `user` → `updateUser`:
![db-user-updating](https://github.com/MiaadTeam/lesan/assets/6236123/dc9a32f6-db31-46fa-8f55-9ffc9e3aaabc)

after executing  `main` → `user` → `updateUser`:
![db-user-updated](https://github.com/MiaadTeam/lesan/assets/6236123/1d6408ba-327f-4987-bebd-dd345618cdf0)

- Worse case "Update `a country`":
```ts
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
```
If the `country` is updated in a real scenario, the number of documents that need to be updated along with the country is likely to be `very large`. Because all `users` and `cities` of that country must be updated.

You can find full example [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/08-2-findOneAndUpdate.ts) and test the `findOneAndUpdate` method in local computer.

before executing  `main` → `country` → `updateCountry`:
![before-update-country](https://github.com/MiaadTeam/lesan/assets/6236123/69bdeb8c-8c30-4af8-bfc4-eca2b04c8ff3)

executing  `main` → `country` → `updateCountry`:
![updating-country](https://github.com/MiaadTeam/lesan/assets/6236123/ff6fdfb8-d074-45c7-836a-1deb81f15172)

after executing  `main` → `country` → `updateCountry`:
![after-update-country](https://github.com/MiaadTeam/lesan/assets/6236123/e749a816-31cd-47da-815f-491cbbecd931)


## Lesan's solution to the update challenge
As you have seen, we face a big problem for `updating` the `country` and `millions` of documents may need to be updated by updating `one` document. This is the biggest challenge in **Lesan** and we propose `3 solutions` to solve this problem:

### QQ solutions
`QQ` stands for query queue, a queue of commands to be sent to the `database`. We use `QQ` to chunk `millions` of `updates`. In this way, we take a section of several hundred thousand that we guess should be updated immediately and perform the update, then we store the ID of the last updated document along with the necessary commands for updating in `QQ`. And we do another part of the update whenever hardware resources are low on contention.

### In-memmory DB solutions

### Make new relation solutions

