# addRelation


lets add `addRelation` functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
const addCityCountryValidator = () => {
  return object({
    set: object({
      city: objectIdValidation,
      country: objectIdValidation,
      isCapital: boolean(),
    }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCityCountry: ActFn = async (body) => {
  const { country, city, isCapital } = body.details.set;
<p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
  return await cities.addRelation({
    filters: { _id: new ObjectId(city) },
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
    replace: true,
  });
  </p>
};
coreApp.acts.setAct({
  schema: "city",
  actName: "addCityCountry",
  validator: addCityCountryValidator(),
  fn: addCityCountry,
});

  </code>
  </pre>
</details>

`addRelations` functions accept three inputs:
- [`TInsertRelations`](../../types/insert/TInsertRelations/main.md)
- [`Projection`](../../types/aggregation/projection/main.md)
- [`Filter`](https://mongodb.github.io/node-mongodb-native/6.3/types/Filter.html)
- `replace` : `boolean`

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
    {
      body: {
        _id: 65a3dfe5b7f33fd5950b9345,
        name: Harat,
        population: 1800000,
        abb: HAR,
        country: {
          _id: 65a3dfe5b7f33fd5950b9342,
          name: Afghanistan,
          population: 15000000,
          abb: AFG
        }
      },
      success: true
    }
    </code>
  </pre>
</details>
