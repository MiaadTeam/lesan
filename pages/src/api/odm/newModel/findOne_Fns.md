# findOne


find a country

lets add getCountry functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
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
    <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
    return await countries
      .findOne({
        filters: { _id: new ObjectId(countryId) },
        projection: get,
      });
      </p>
  };
  coreApp.acts.setAct({
    schema: "country",
    actName: "getCountry",
    validator: getCountryValidator(),
    fn: getCountry,
  });

  </code>
  </pre>
</details>

`findOne` functions accept three inputs:
- `filters` which is mongodb [findOne](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-projection-operators-top) query operation
- `projection` which is mongodb [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/#std-label-findOne-projection) operation
- and optional `option` which is mongodb [findOption](https://mongodb.github.io/node-mongodb-native/4.0//interfaces/findoptions.html)  

You can also read mongodb [`findOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/) section for more information.  


<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      {
        body: 
          {
            _id: 659fda257b94d4cdfed11dec,
            name: Kiribati,
            population: 68092328,
            abb: AIA
          },
        success: true
      }
    </code>
  </pre>
</details>
