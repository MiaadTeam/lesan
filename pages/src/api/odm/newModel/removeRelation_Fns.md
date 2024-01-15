# removeRelation

lets add `removeRelation` functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
const removeMostLovedCityValidator = () => {
  return object({
    set: object({
      _id: objectIdValidation,
      lovedCity: objectIdValidation,
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};

const removeMostLovedCity: ActFn = async (body) => {
  const { lovedCity, _id } = body.details.set;
<p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; margin:0">
  return await users.removeRelation({
    filters: { _id: new ObjectId(_id) },
    projection: body.details.get,
    relations: {
      mostLovedCity: {
        _ids: new ObjectId(lovedCity),
        relatedRelations: {
          lovedByUser: true,
        },
      },
    },
  });
  </p>
};
coreApp.acts.setAct({
  schema: "user",
  actName: "removeMostLovedCity",
  validator: removeMostLovedCityValidator(),
  fn: removeMostLovedCity,
});

  </code>
  </pre>
</details>

`removeRelations` functions accept three inputs:
- [`TInsertRelations`](../../types/insert/TInsertRelations/main.md)
- [`Projection`](../../types/aggregation/projection/main.md)
- [`Filter`](https://mongodb.github.io/node-mongodb-native/6.3/types/Filter.html)

<details>
  <summary>
    Return Of Example:
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      {
        body: {
          _id: 65a3d561b7f33fd5950b932e,
          name: Erfan Gholami,
          age: 22,
          livedCities: [
            {
              _id: 65a3d560b7f33fd5950b931f,
              name: Tehran,
              population: 50,
              abb: TH
            },
            {
              _id: 65a3d560b7f33fd5950b9320,
              name: Kerman,
              population: 12,
              abb: KM
            }
          ],
          country: {
            _id: 65a3d55fb7f33fd5950b9312,
            name: Iran,
            population: 15000000,
            abb: IRI
          },
          mostLovedCity: {}
        },
        success: true
      }
    </code>
  </pre>
</details>