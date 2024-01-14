# getRelation

```ts
getRelation: (name: string, relationType: RelationType)
```

_Get inerRelatrion or outerRealtion of one schema_

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
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const getCityRelation = coreApp.schemas.getRelation("city", "relations");</p>
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
  "country": {
    "schemaName": "country",
    "type": "single",
    "optional": false,
    "relatedRelations": {
      "citiesAsc": {
        "type": "multiple",
        "limit": 5,
        "sort": {
          "field": "_id",
          "order": "asc"
        }
      }
    }
  }
}
    </code>
  </pre>
</details>

<h3>Parameters</h3>
<pre>
  <code class="language-ts" style="padding: 0; margin-top: 12px; margin-top: -18px;">
  name: string
  relationType: <a href="../../types/schema/RelationType.md" target="_blank" style="text-decoration: none; cursor:pointer">RelationType</a>
  </code>
</pre>
