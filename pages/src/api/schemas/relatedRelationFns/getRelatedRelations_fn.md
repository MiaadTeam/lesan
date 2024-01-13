# getRelatedRelations

```ts
getRelatedRelations: (schemaName: string)
```

_GetOutRelations of one schema_

<details open>
 <summary>
  Example
  </summary>
  <pre>
    <code class="language-ts" style="padding: 0;">
      const coreApp = lesan();
      const locationPure = {
        name: string(),
        population: number(),
        abb: string(),
      };
      const cities = coreApp.odm.newModel(
        "city",
        locationPure,
        {
          country: {
            schemaName: "country",
            type: "single",
            optional: false,
            relatedRelations: {
              cities: {
                type: "multiple",
                limit: 5,
                sort: {
                  field: "_id",
                  order: "asc",
                },
              },
            },
          },
        },
      );
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000" >const getCityRelatedRelations = coreApp.schemas.getRelatedRelations("city");</p>
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
  "users": {
    "mainRelationName": "livedCities",
    "mainRelationType": "multiple",
    "schemaName": "user",
    "type": "multiple",
    "limit": 5,
    "sort": {
      "field": "_id",
      "order": "desc"
    }
  },
  "lovedByUser": {
    "mainRelationName": "mostLovedCity",
    "mainRelationType": "single",
    "schemaName": "user",
    "type": "multiple",
    "limit": 3,
    "sort": {
      "field": "_id",
      "order": "desc"
    }
  }
}
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
  schemaName: string
  </code>
</pre>
