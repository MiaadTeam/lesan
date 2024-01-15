# findOneAndUpdate

Updating is the most challenging issue in **Lesan**. Because by updating one document, thousands or maybe millions of other documents may also be updated.  
Let's explore a few scenarios.  



Update a user

lets add findOneAndUpdate functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
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
    <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
        return await users.findOneAndUpdate({
          filter: { _id: new ObjectId(_id) },
          projection: body.details.get,
          update: { $set: setObj },
        });
      </p>
  };
    coreApp.acts.setAct({
      schema: "user",
      actName: "updateUser",
      validator: updateUserValidator(),
      fn: updateUser,
    });
  </code>
  </pre>
</details>

`findOneAndUpdate` functions accept three inputs:
- `filters` which is mongodb [`filter query operation`](https://mongodb.github.io/node-mongodb-native/6.3/types/Filter.html)
- `update` which is mongodb [`projection operation`](https://mongodb.github.io/node-mongodb-native/6.3/types/UpdateFilter.html)
- and `optional` option which is mongodb [`projection`](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/BSON.Document.html)

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      {
        body: {
          _id: 659fda277b94d4cdfed11e15,
          name: Syd Amir,
          age: 35,
          livedCities: [
            {
              _id: 659fda277b94d4cdfed11e10,
              name: Yazd,
              population: 16,
              abb: YZ
            },
            {
              _id: 659fda267b94d4cdfed11e0c,
              name: Esfahan,
              population: 25,
              abb: ES
            },
            {
              _id: 659fda267b94d4cdfed11e0b,
              name: Kerman,
              population: 12,
              abb: KM
            },
            {
              _id: 659fda267b94d4cdfed11e0a,
              name: Tehron,
              population: 10000000,
              abb: TEH
            },
            {
              _id: 659fda267b94d4cdfed11e09,
              name: Hamedan,
              population: 10,
              abb: HM
            }
          ],
          country: {
            _id: 659fda267b94d4cdfed11dfd,
            name: Islamic Republic Of Iran,
            population: 95000000,
            abb: IRI
          }
        },
        success: true
      }
    </code>
  </pre>
</details>



