# find

find countries

lets add `getCountries` functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
  const getCountriesValidator = () => {
    return object({
      set: object({
        page: number(),
        limit: number(),
      }),
      get: coreApp.schemas.selectStruct("country", 1),
    });
  };
  const getCountries: ActFn = async (body) => {
    let {
      set: { page, limit },
      get,
    } = body.details;
    page = page || 1;
    limit = limit || 50;
    const skip = limit * (page - 1);
    <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
    return await countries
      .find({ projection: get, filters: {} })
      .skip(skip)
      .limit(limit)
      .toArray();
      </p>
  };
  coreApp.acts.setAct({
    schema: "country",
    actName: "getCountries",
    validator: getCountriesValidator(),
    fn: getCountries,
  });

  </code>
  </pre>
</details>

`find` functions accept three inputs:
- `filters` which is mongodb [`filter query operation`](https://mongodb.github.io/node-mongodb-native/6.3/types/Filter.html)
- `projection` which is mongodb [`projection operation`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/#std-label-findOne-projection)
- and `optional` option which is mongodb [`findOption`](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/FindOptions.html)

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
            _id: 659fda257b94d4cdfed11dec,
            name: Kiribati,
            population: 68092328,
            abb: AIA
          },
          {
            _id: 659fda267b94d4cdfed11ded,
            name: Aruba,
            population: 31408054,
            abb: BHS
          }
        ],
        success: true
      }
    </code>
  </pre>
</details>
