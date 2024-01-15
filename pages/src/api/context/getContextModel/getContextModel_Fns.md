# getContextModel

```ts
const getContextModel = () => context;
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
      myContext: {
        Headers: Headers {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          authorization: "",
          connection: "keep-alive",
          "content-length": "349",
          "content-type": "application/json",
          host: "localhost:1366",
          origin: "http://localhost:1366",
          referer: "http://localhost:1366/playground",
          "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3"... 1 more character
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
              name: "hamedan",
              population: 500000,
              abb: "hmd",
              isCapital: false,
              country: "6598f6594dd08ab9b8598206"
            }
          }
        },
        con: {
          Headers: Headers {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            authorization: "",
            connection: "keep-alive",
            "content-length": "349",
            "content-type": "application/json",
            host: "localhost:1366",
            origin: "http://localhost:1366",
            referer: "http://localhost:1366/playground",
            "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3"... 1 more character
          },
          body: {
            service: "main",
            model: "city",
            act: "addCity",
            details: { get: [Object], set: [Object] }
          },
     <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line"> userName: "Mina" </P>
        }
      }
    </code>
  </pre>
</details>
