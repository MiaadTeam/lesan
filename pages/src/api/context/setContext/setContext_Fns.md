# setContext

<!-- asigne all of value that we want to carry -->
<!-- @param con - objects of key , value -->
<!-- @returns nothing -->



```ts
const setContext = (
  obj: Record<string, any>,
) => (context = { ...getContextModel(), ...obj });
```

[`getContextModel`](../getContextModel/getContextModel_Fns.md)

</br>
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      const addCityValidator = () => {
        return object({
          set: object({
            ...locationPure,
            isCapital: optional(boolean()),
            country: objectIdValidation,
            }),
            get: coreApp.schemas.selectStruct("city", 1),
        });
      };
      const addCity: ActFn = async (body) => {
        const { country, isCapital, name, population, abb } = body.details.set;
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000;          white-space: pre-line; margin: 0;">const myContext = coreApp.contextFns.getContextModel();</P>
        return await cities.insertOne({
          doc: { name, population, abb },
          projection: body.details.get,
          relations: {
            country: {
              _ids: new ObjectId(country),
              relatedRelations: {
                citiesAsc: true,
                citiesDesc: true,
                citiesByPopAsc: true,
                citiesByPopDesc: true,
                capitalCity: isCapital,
              },
            },
          },
        });
      };
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line; margin: 0;">const addSomthingToContext = () => {
            const prevContext = coreApp.contextFns.getContextModel();
            coreApp.contextFns.addContext({ ...prevContext, userName: "Mina" });
          }
      </P>
    coreApp.acts.setAct({
      schema: "city",
      actName: "addCity",
      validator: addCityValidator(),
      fn: addCity,
    })

<p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line;">preAct: [addSomthingToContext]</P>
    </code>
  </pre>
</details>



  <details>
  <summary>
    Return Of Example
  </summary>
  <pre>
    <code class="language-json" style="padding: 0;">
    {
      Headers: Headers {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.5",
      authorization: "",
      connection: "keep-alive",
      "content-length": "349",
      "content-type": "application/json",
      cookie: "next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MmT9zoRN0E-gIPB-.HOQdbQUu6-36jQKBAn...",
      host: "localhost:1366",
      origin: "http://localhost:1366",
      referer: "http://localhost:1366/playground",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0"
    },
      body: {
        service: "main",
        model: "city",
        act: "addCity",
        details: {
          get: {
            _id: 1,
            name: 1,
            population: 1,
            abb: 1,
            country: [Object],
            users: [Object],
            lovedByUser: [Object]
          },
          set: {
            name: "malayer",
            population: 500000,
            abb: "mlr",
            isCapital: false,
            country: "659fda267b94d4cdfed11dfb"
          }
        }
      },
      name: "malayer"
    }
    </code>
  </pre>
</details>
