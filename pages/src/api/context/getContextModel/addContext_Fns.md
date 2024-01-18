# addContext

<!-- add Request to Context because the requeste may be required in later functions
@param con - request of user
@returns nothing -->


add Request to Context because the requeste may be required in later functions
```ts
const addContext = (con: LesanContenxt) => context = { ...context, con };
```

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
        "content-length": "343",
        "content-type": "application/json",
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
                  name: "sss",
                  population: 456546,
                  abb: "s",
                  isCapital: false,
                  country: "659fda267b94d4cdfed11dee"
              }
            }
          },
          name: "malayer",
          con: {
              Headers: Headers {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.5",
          authorization: "",
          connection: "keep-alive",
          "content-length": "343",
          "content-type": "application/json",
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
              details: { get: [Object], set: [Object] }
              },
              name: "malayer",
              userName: "Mina"
        }
      }
    </code>
  </pre>
</details>
