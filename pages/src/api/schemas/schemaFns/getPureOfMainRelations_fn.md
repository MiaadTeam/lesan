# getPureOfMainRelations

```ts
 getPureOfMainRelations: (schemaName: keyof TSchemas)
```

_Extract pure feature of inrelations schema_

</br>
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
      const cities = coreApp.odm.newModel("city", locationPure, {
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
      });
      <p style="border: 2px solid gray; border-right: transparent; border-left: transparent; padding: 5px 1rem; background-color: #000000; white-space: pre-line" >const getCityPureOfMainRelations = coreApp.schemas.getPureOfMainRelations("city");</p>
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
      "_id": {
        "type": "union",
        "schema": null
      },
      "name": {
        "type": "string",
        "schema": null
      },
      "population": {
        "type": "number",
        "schema": null
      },
      "abb": {
        "type": "string",
        "schema": null
      },
      "country": {
        "type": "object",
        "schema": {
          "_id": {
            "type": "union",
            "schema": null
          },
          "name": {
            "type": "string",
            "schema": null
          },
          "population": {
            "type": "number",
            "schema": null
          },
          "abb": {
            "type": "string",
            "schema": null
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
  schemaName: keyof <a href="../../types/schema/Tschemas.md" target="_blank" style="text-decoration: none; cursor:pointer">TSchemas</a>
  </code>
</pre>
