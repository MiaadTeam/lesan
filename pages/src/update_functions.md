# Update functions
Updating is the most challenging issue in **Lesan**. Because by updating one document, thousands or maybe millions of other documents may also be updated.  
Let's explore a few scenarios.  
1. Best case: Update a user
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
