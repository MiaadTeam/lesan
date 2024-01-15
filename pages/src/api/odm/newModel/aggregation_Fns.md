# aggregation


lets add `addRelation` functions:
<details open>
  <summary>
    Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0px;">
  const getCitiesValidator = () => {
    return object({
      set: object({
        page: number(),
        take: number(),
        countryId: optional(size(string(), 24)),
      }),
      get: coreApp.schemas.selectStruct("city", 5),
    });
  };
  const getCities: ActFn = async (body) => {
    const {
      set: { page, take, countryId },
      get,
    } = body.details;
    const pipeline = [];
    pipeline.push({ $skip: (page - 1) * take });
    pipeline.push({ $limit: take });
    countryId &&
      pipeline.push({ $match: { "country._id": new ObjectId(countryId) } });
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000;  margin:0">
      return await cities
      .aggregation({
        pipeline,
        projection: get,
      })
      .toArray();
    </p>
  };
  coreApp.acts.setAct({
    schema: "city",
    actName: "getCities",
    validator: getCitiesValidator(),
    fn: getCities,
  });

  </code>
  </pre>
</details>

`find` functions accept three inputs:
- `pipeline` which is mongodb [`pipline array document`](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/BSON.Document.html)
- `projection` which is mongodb [`projection operation`](../../types/aggregation/projection/main.md)
- and `optional` option which is mongodb [`aggregateOptions`](https://mongodb.github.io/node-mongodb-native/6.3/interfaces/AggregateOptions.html)

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