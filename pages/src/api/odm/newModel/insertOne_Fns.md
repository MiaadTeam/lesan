# insertOne

```ts
{
  doc: OptionalUnlessRequiredId<InferPureFieldsType>;
  relations?: TInsertRelations<TR>;
  options?: InsertOptions;
  projection?: Projection;
}
```

- The `doc` key receives an object of the pure values of the selected model. `OptionalUnlessRequiredId` type is the `document` type in the official MongoDB driver. You can read about it [here](https://mongodb.github.io/node-mongodb-native/6.1/types/OptionalUnlessRequiredId.html).
- The `relations` key receives an object from the relations of this model. There is no relationship here. We will read about this in the next section.
- The `options` key gets the official MongoDB driver options to insertOne. You can read more about this [here](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne)
- The `projection` key is used to receive written data. We use native projection in MangoDB. You can read MongoDB's own documentation [here](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/). In `insertOne`, you can only penetrate one step in relationships. Here you can get only pure fields because there is no relation. We will read more about this later.

## The code
So this is all the code we've written so far (You can also see and download this code from [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/02-impement-first-fn.ts)):


<br>

<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
        const addCountryValidator = () => {
          return object({
            set: object(locationPure),
            get: coreApp.schemas.selectStruct("country", { users: 1 }),
          });
        };
        const addCountry: ActFn = async (body) => {
          const { name, population, abb } = body.details.set;
        <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">         return await countries.insertOne({
                        doc: {
                          name,
                          population,
                          abb,
                        },
                        projection: body.details.get,
                      });</p>
            
        };
        coreApp.acts.setAct({
          schema: "country",
          actName: "addCountry",
          validator: addCountryValidator(),
          fn: addCountry,
        });
    
</code>
  </pre>
</details>


<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
    {
      body: {
        _id: 65a24bd39e02c1041973ec21,
        name: testCountry,
        population: 90661541,
        abb: tc
      },
      success: true
    }
    </code>
  </pre>
</details>