# insertMany

lets add getCountry functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
  const addMultipleCountriesValidator = () => {
    return object({
      set: object({ multiCountries: array(object()) }),
      get: coreApp.schemas.selectStruct("country", { users: 1 }),
    });
  };
  const addCountries: ActFn = async (body) => {
    const { multiCountries } = body.details.set;
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
        return await countries.insertMany({
            docs: multiCountries,
            projection: body.details.get,
        });
      </p>
  };
  coreApp.acts.setAct({
    schema: "country",
    actName: "addCountries",
    validator: addMultipleCountriesValidator(),
    fn: addCountries,
  });
  </code>
  </pre>
</details>

`insertMany` functions accept three inputs:
- [`docs`](https://mongodb.github.io/node-mongodb-native/6.3/types/OptionalUnlessRequiredId.html)
- [`relations`](../../types/insert/TInsertRelations/main.md)
- [`projection`](../../types/aggregation/projection/main.md)
- [`options`](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/BulkWriteOptions.html)

## The code
So this is all the code we've written so far (You can also see and download this code from [here](https://raw.githubusercontent.com/MiaadTeam/lesan/main/examples/document/02-impement-first-fn.ts)):

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      {
        body: [
          {
            _id: 65a3cabbb7f33fd5950b92fe,
            name: Afghanistan,
            population: 15000000,
            abb: AFG
          },
          {
            _id: 65a3cabbb7f33fd5950b92ff,
            name: Iraq,
            population: 35000000,
            abb: IRQ
          },
          {
            _id: 65a3cabbb7f33fd5950b9300,
            name: Iran,
            population: 15000000,
            abb: IRI
          }
        ],
        success: true
      }
    </code>
  </pre>
</details>
